// 音源
class Source3 {
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
class Observer3 {
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
class HiddenWave3 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( source3.actual_x >= this.x ) {
      this.radius += 1.4;
    }
  }
}

// 音波
class Wave3 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( source3.actual_x >= this.x ) {
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
class ObsWaveLeft3 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( observer3.actual_x >= this.x ) {
      this.radius += 1.2;
    }
  }
}

// 観測者の音波右側(観測者のグラフ描画用)
class ObsWaveRight3 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( observer3.actual_x >= this.x ) {
      this.radius += 1.6;
    }
  }
}

// 音源の振動グラフ
class SrcGraph3 {
  constructor( start_x, width, dist, r, wl ) {
    if ( source3.actual_x >= start_x ) {
      this.start_x = source3.actual_x;
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
class ObsGraph3 {
  constructor( start_x, width, dist, r, wl ) {
    if ( start_x === obsWaveRightList[9].x + obsWaveRightList[9].radius ) {
      this.start_x = start_x;
    } else if ( observer3.actual_x >= obsWaveRightList[0].x ) {
      this.start_x = observer3.actual_x;
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
const objCreate3 = () => {
  line      = new Line();
  graphLine = new GraphLine();
  source3   = new Source3( 10, 0.6 );
  observer3 = new Observer3( 150, 0.4 );
  srcBar3   = new SrcBar( source3.actual_x );
  obsBar3   = new ObsBar( observer3.actual_x );
}

const waveListStore3 = () => {
  hiddenWave3 = new HiddenWave3( 72 );
  for ( let i = 0; i < phenom_cvs.width; i += 36 ) {
    waveList.push( new Wave3( 108 + i ) );
  }

  hiddenObsWaveLeft3 = new ObsWaveLeft3( 433 );
  for ( let i = 0; i < phenom_cvs.width; i += 26.8 ) {
    obsWaveLeftList.push( new ObsWaveLeft3( 459.8 + i ) );
  }

  hiddenObsWaveRight3 = new ObsWaveRight3( 243.8 );
  for ( let i = 0; i < phenom_cvs.width; i += 19.2 ) {
    obsWaveRightList.push( new ObsWaveRight3( 263 + i ) );
  }
};

const srcGraphObjCreate3 = () => {
  srcGraphLeft3 = new SrcGraph3(
    waveList[0].x,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave3.x - hiddenWave3.radius - ( waveList[0].x - waveList[0].radius )
  );

  srcGraphRight3 = new SrcGraph3(
    waveList[0].x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave3.x + hiddenWave3.radius - ( waveList[0].x + waveList[0].radius )
  );
};

const obsGraphObjCreate3 = () => {
  obsGraphLeft3 = new ObsGraph3(
    obsWaveLeftList[0].x,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveLeft3.x - hiddenObsWaveLeft3.radius - ( obsWaveLeftList[0].x - obsWaveLeftList[0].radius )
  );

  obsGraphRight3 = new ObsGraph3(
    obsWaveRightList[0].x,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveRight3.x + hiddenObsWaveRight3.radius - ( obsWaveRightList[0].x + obsWaveRightList[0].radius )
  );

  obsGraphRightAfter3 = new ObsGraph3(
    obsWaveRightList[9].x + obsWaveRightList[9].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveRight3.x + hiddenObsWaveRight3.radius - ( obsWaveRightList[0].x + obsWaveRightList[0].radius )
  );
};

const audioObjCreate3 = () => {
  if ( isAudioPlay ) {
    if ( Math.floor( observer3.actual_x ) === Math.floor( obsWaveLeftList[0].x ) ) {
      oscNode.stop();
      audioObj( 380.00 );
      oscNode.start();
    } else if ( Math.floor( observer3.actual_x ) === Math.floor( obsWaveRightList[9].x ) ) {
      oscNode.stop();
      audioObj( 400.00 );
      oscNode.start();
    } else if ( Math.floor( observer3.actual_x ) === Math.floor( obsWaveRightList[0].x ) ) {
      oscNode.stop();
      audioObj( 428.57 );
      oscNode.start();
    }
  } else {
    if ( obsWaveLeftList[0].radius > 0 && observer3.actual_x > obsWaveLeftList[0].x ) {
      oscNode.stop();
      audioObj( 380.00 );
      oscNode.start();
    } else if ( obsWaveRightList[9].radius > 0 && observer3.actual_x > obsWaveRightList[9].x ) {
      oscNode.stop();
      audioObj( 400.00 );
      oscNode.start();
    } else if ( obsWaveRightList[0].radius > 0 && observer3.actual_x > obsWaveRightList[0].x ) {
      oscNode.stop();
      audioObj( 428.57 );
      oscNode.start();
    }
  }
}

const objUpdate3 = () => {
  source3.update();
  observer3.update();
  srcBar3.update( source3.actual_x );
  obsBar3.update( observer3.actual_x );
  hiddenWave3.update();
  waveList.forEach( ( waveObj ) => waveObj.update() );
  hiddenObsWaveLeft3.update();
  obsWaveLeftList.forEach( ( obsWaveLeftObj ) => obsWaveLeftObj.update() );
  hiddenObsWaveRight3.update();
  obsWaveRightList.forEach( ( obsWaveRightObj ) => obsWaveRightObj.update() );
}

const objRender3 = () => {
  line.render( phenom_ctx );
  graphLine.render( graph1_ctx );
  graphLine.render( graph2_ctx );
  graphLine.render( graph3_ctx );
  srcBar3.render_border( bar_ctx );
  srcBar3.render_fill( bar_ctx );
  obsBar3.render_border( bar_ctx );
  obsBar3.render_fill( bar_ctx );
  source3.render( bar_ctx );
  observer3.render( bar_ctx );
  waveList.forEach( ( waveObj ) => waveObj.render( phenom_ctx ) );
}

const graphObjRender3 = () => {
  srcGraphLeft3.render( graph1_ctx );
  srcGraphRight3.render( graph1_ctx );
  srcGraphLeft3.render( graph3_ctx );
  srcGraphRight3.render( graph3_ctx );

  if ( observer3.actual_x <= obsWaveRightList[9].x ) {
    obsGraphRight3.render_right( graph2_ctx );
    obsGraphRight3.render_right( graph3_ctx );
  } else if ( observer3.actual_x >= obsWaveRightList[9].x && observer3.actual_x >= source3.actual_x ) {
    obsGraphRightAfter3.render_right( graph2_ctx );
    obsGraphRightAfter3.render_right( graph3_ctx );
  } else {
    obsGraphRightAfter3.render_right( graph2_ctx );
    obsGraphRightAfter3.render_right( graph3_ctx );
    obsGraphLeft3.render_left( graph2_ctx );
    obsGraphLeft3.render_left( graph3_ctx );
  }
}

const loop3 = () => {
  clearCvs();

  objUpdate3();
  srcGraphObjCreate3();
  obsGraphObjCreate3();
  audioObjCreate3();
  disp( 60.00, 40.00, 400.00 );

  objRender3();
  graphObjRender3();

  callbackId = window.requestAnimationFrame( loop3 );

  if ( observer3.actual_x >= waveList[waveList.length - 1].x - waveList[waveList.length - 1].radius ) onResetButtonClick();
};
