// 音源
class Source4 {
  constructor( x, vel ) {
    this.x        = x;
    this.actual_x = this.x + 40;
    this.vel      = vel;
  }

  update() {
    this.x += this.vel;
    this.actual_x = this.x + 40;
  }

  render( ctx ) {
    ctx.drawImage( imgList[0], this.x, 207, 75, 75 );
  }
}

// 観測者
class Observer4 {
  constructor( x, vel ) {
    this.x        = x;
    this.actual_x = this.x + 30;
    this.vel      = vel;
  }

  update() {
    this.x += this.vel;
    this.actual_x = this.x + 30;
  }

  render( ctx ) {
    ctx.drawImage( imgList[2], this.x, 215, 60, 60 );
  }
}

// 1番目の音波(波長計算用)
class HiddenWave4 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( source4.actual_x >= this.x ) {
      this.radius += 1.4;
    }
  }
}

// 音波
class Wave4 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( source4.actual_x >= this.x ) {
      this.radius += 1.4;
    }
  }

  render( ctx ) {
    ctx.strokeStyle = 'royalblue';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.arc( this.x, 80, this.radius, 0, Math.PI * 2, true );
    ctx.stroke();
  }
}

// 観測者の音波左側(観測者のグラフ描画用)
class ObsWaveLeft4 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( observer4.actual_x >= this.x ) {
      this.radius += 1.2;
    }
  }
}

// 観測者の音波右側(観測者のグラフ描画用)
class ObsWaveRight4 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( observer4.actual_x >= this.x ) {
      this.radius += 1.6;
    }
  }
}

// 音源の振動グラフ
class SrcGraph4 {
  constructor( start_x, width, dist, r, wl ) {
    if ( source4.actual_x >= start_x ) {
      this.start_x = source4.actual_x;
    } else {
      this.start_x = start_x;
    }

    if ( width <= 0 ) {
      this.width = 0;
    } else if ( width >= graph1_cvs.width ) {
      this.width = graph1_cvs.width;
    } else {
      this.width = width;
    }

    this.dist = dist;
    this.r    = r;
    this.wl   = wl;
  }

  render( ctx ) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo( this.start_x, this.r - this.r * Math.cos( ( 2 * Math.PI / this.wl ) * ( this.dist - this.start_x ) ) );
    if ( this.start_x > this.width ) {
      for ( let x = 0; x <= this.start_x - this.width; x++ ) {
        const y = this.r * Math.cos( ( 2 * Math.PI / this.wl ) * ( this.start_x - this.dist - x ) );
        ctx.lineTo( this.start_x - x, this.r - y );
      }
    } else {
      for ( let x = 0; x <= this.width - this.start_x; x++ ) {
        const y = this.r * Math.cos( ( 2 * Math.PI / this.wl ) * ( this.dist - this.start_x - x ) );
        ctx.lineTo( this.start_x + x, this.r - y );
      }
    }
    ctx.stroke();
  }
}

// 観測者の振動グラフ
class ObsGraph4 {
  constructor( start_x, width, dist, r, wl ) {
    if ( start_x === obsWaveLeftList[9].x - obsWaveLeftList[9].radius ) {
      this.start_x = start_x;
    } else if ( observer4.actual_x >= obsWaveLeftList[0].x ) {
      this.start_x = observer4.actual_x;
    } else {
      this.start_x = start_x;
    }

    if ( width <= 0 ) {
      this.width = 0;
    } else if ( width >= graph1_cvs.width ) {
      this.width = graph1_cvs.width;
    } else {
      this.width = width;
    }

    this.dist = dist;
    this.r    = r;
    this.wl   = wl;
  }

  render_left( ctx ) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo( this.start_x, this.r - this.r * Math.cos( ( 2 * Math.PI / this.wl ) * ( this.dist - this.start_x ) ) );
    for ( let x = 0; x <= this.start_x - this.width; x++ ) {
      const y = this.r * Math.cos( ( 2 * Math.PI / this.wl ) * ( this.start_x - this.dist - x ) );
      ctx.lineTo( this.start_x - x, this.r - y );
    }
    ctx.stroke();
  }

  render_right( ctx ) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo( this.start_x, this.r - this.r * Math.cos( ( 2 * Math.PI / this.wl ) * ( this.dist - this.start_x ) ) );
    for ( let x = 0; x <= this.width - this.start_x; x++ ) {
      const y = this.r * Math.cos( ( 2 * Math.PI / this.wl ) * ( this.dist - this.start_x - x ) );
      ctx.lineTo( this.start_x + x, this.r - y );
    }
    ctx.stroke();
  }
}

// 各オブジェクト作成
const objCreate4 = () => {
  line      = new Line();
  graphLine = new GraphLine();
  source4   = new Source4( 130, 0.4 );
  observer4 = new Observer4( 10, 0.6 );
  srcBar4   = new SrcBar( source4.actual_x );
  obsBar4   = new ObsBar( observer4.actual_x );
}

const waveListStore4 = () => {
  hiddenWave4 = new HiddenWave4( 180 );
  for ( let i = 0; i < phenom_cvs.width; i += 24 ) {
    waveList.push( new Wave4( 204 + i ) );
  }

  hiddenObsWaveLeft4 = new ObsWaveLeft4( 92.5 );
  for ( let i = 0; i < phenom_cvs.width; i += 32.5 ) {
    obsWaveLeftList.push( new ObsWaveLeft4( 125 + i ) );
  }

  hiddenObsWaveRight4 = new ObsWaveRight4( 413 );
  for ( let i = 0; i < phenom_cvs.width; i += 45 ) {
    obsWaveRightList.push( new ObsWaveRight4( 458 + i ) );
  }
};

const srcGraphObjCreate4 = () => {
  srcGraphLeft4 = new SrcGraph4(
    waveList[0].x,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave4.x - hiddenWave4.radius - ( waveList[0].x - waveList[0].radius )
  );

  srcGraphRight4 = new SrcGraph4(
    waveList[0].x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave4.x + hiddenWave4.radius - ( waveList[0].x + waveList[0].radius )
  );
};

const obsGraphObjCreate4 = () => {
  obsGraphLeft4 = new ObsGraph4(
    obsWaveLeftList[0].x,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveLeft4.x - hiddenObsWaveLeft4.radius - ( obsWaveLeftList[0].x - obsWaveLeftList[0].radius )
  );

  obsGraphLeftAfter4 = new ObsGraph4(
    obsWaveLeftList[9].x - obsWaveLeftList[9].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveLeft4.x - hiddenObsWaveLeft4.radius - ( obsWaveLeftList[0].x - obsWaveLeftList[0].radius )
  );

  obsGraphRight4 = new ObsGraph4(
    obsWaveRightList[0].x,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveRight4.x + hiddenObsWaveRight4.radius - ( obsWaveRightList[0].x + obsWaveRightList[0].radius )
  );
};

const audioObjCreate4 = () => {
  if ( isAudioPlay ) {
    if ( Math.floor( observer4.actual_x ) === Math.floor( obsWaveRightList[0].x ) ) {
      oscNode.stop();
      audioObj( 421.05 );
      oscNode.start();
    } else if ( Math.floor( observer4.actual_x ) === Math.floor( obsWaveLeftList[9].x ) ) {
      oscNode.stop();
      audioObj( 400.00 );
      oscNode.start();
    } else if ( Math.floor( observer4.actual_x ) === Math.floor( obsWaveLeftList[0].x ) ) {
      oscNode.stop();
      audioObj( 373.33 );
      oscNode.start();
    }
  } else {
    if ( obsWaveLeftList[0].radius > 0 && observer4.actual_x > obsWaveRightList[0].x ) {
      oscNode.stop();
      audioObj( 421.05 );
      oscNode.start();
    } else if ( obsWaveLeftList[9].radius > 0 && observer4.actual_x > obsWaveLeftList[9].x ) {
      oscNode.stop();
      audioObj( 400.00 );
      oscNode.start();
    } else if ( obsWaveLeftList[0].radius > 0 && observer4.actual_x > obsWaveLeftList[0].x ) {
      oscNode.stop();
      audioObj( 373.33 );
      oscNode.start();
    }
  }
}

const objUpdate4 = () => {
  source4.update();
  observer4.update();
  srcBar4.update( source4.actual_x );
  obsBar4.update( observer4.actual_x );
  hiddenWave4.update();
  waveList.forEach( ( waveObj ) => waveObj.update() );
  hiddenObsWaveLeft4.update();
  obsWaveLeftList.forEach( ( obsWaveLeftObj ) => obsWaveLeftObj.update() );
  hiddenObsWaveRight4.update();
  obsWaveRightList.forEach( ( obsWaveRightObj ) => obsWaveRightObj.update() );
}

const objRender4 = () => {
  line.render( phenom_ctx );
  graphLine.render( graph1_ctx );
  graphLine.render( graph2_ctx );
  graphLine.render( graph3_ctx );
  srcBar4.render_border( bar_ctx );
  srcBar4.render_fill( bar_ctx );
  obsBar4.render_border( bar_ctx );
  obsBar4.render_fill( bar_ctx );
  source4.render( bar_ctx );
  observer4.render( bar_ctx );
  waveList.forEach( ( waveObj ) => waveObj.render( phenom_ctx ) );
}

const graphObjRender4 = () => {
  srcGraphLeft4.render( graph1_ctx );
  srcGraphRight4.render( graph1_ctx );
  srcGraphLeft4.render( graph3_ctx );
  srcGraphRight4.render( graph3_ctx );

  if ( observer4.actual_x <= obsWaveLeftList[9].x ) {
    obsGraphLeft4.render_left( graph2_ctx );
    obsGraphLeft4.render_left( graph3_ctx );
  } else if ( observer4.actual_x > obsWaveLeftList[9].x && observer4.actual_x < obsWaveRightList[0].x ) {
    obsGraphLeftAfter4.render_left( graph2_ctx );
    obsGraphLeftAfter4.render_left( graph3_ctx );
  } else if ( observer4.actual_x >= obsWaveRightList[0].x ) {
    obsGraphRight4.render_right( graph2_ctx );
    obsGraphRight4.render_right( graph3_ctx );
    obsGraphLeftAfter4.render_left( graph2_ctx );
    obsGraphLeftAfter4.render_left( graph3_ctx );
  }
}

const loop4 = () => {
  clearCvs();

  objUpdate4();
  srcGraphObjCreate4();
  obsGraphObjCreate4();
  audioObjCreate4();
  disp( 40.00, 60.00, 400.00 );

  objRender4();
  graphObjRender4();

  callbackId = window.requestAnimationFrame( loop4 );

  if ( observer4.x >= phenom_cvs.width ) onResetButtonClick();
};
