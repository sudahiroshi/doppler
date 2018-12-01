// 音源
class Source0 {
  constructor( x, vel ) {
    this.x        = x;
    this.actual_x = this.x + 40;
    this.vel      = vel;
  }

  update() {
    this.x += this.vel;
    this.actual_x += this.vel;
  }

  render( ctx ) {
    ctx.drawImage( imgList[0], this.x, 207, 75, 75 );
  }
}

// 1番目の音波(描画しない)
class HiddenWave0 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( source0.actual_x >= this.x ) {
      this.radius += 1.4;
    }
  }
}

// 音波
class Wave0 {
  constructor( x ) {
    this.x      = x;
    this.radius = 0;
  }

  update() {
    if ( source0.actual_x >= this.x ) {
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

// 音源の振動グラフ
class SrcGraph0 {
  constructor( start_x, width, dist, r, wl ) {
    if ( source0.actual_x >= start_x ) {
      this.start_x = source0.actual_x;
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

// 各オブジェクト作成
const objCreate0 = () => {
  line      = new Line();
  graphLine = new GraphLine();
  source0   = new Source0( 10, 0.6 );
  srcBar0   = new SrcBar( source0.actual_x );
}

// 音波オブジェクト作成
const waveListStore0 = () => {
  hiddenWave0 = new HiddenWave0( 72 );
  for ( let i = 0; i < phenom_cvs.width; i += 36 ) {
    waveList.push( new Wave0( 108 + i ) );
  }
}

// 音源の振動グラフのオブジェクト作成
const srcGraphObjCreate0 = () => {
  srcGraphLeft0 = new SrcGraph0(
    waveList[0].x,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave0.x - hiddenWave0.radius - ( waveList[0].x - waveList[0].radius )
  );

  srcGraphRight0 = new SrcGraph0(
    waveList[0].x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave0.x + hiddenWave0.radius - ( waveList[0].x + waveList[0].radius )
  );
};

// オブジェクト更新
const objUpdate0 = () => {
  source0.update();
  srcBar0.update( source0.actual_x );
  hiddenWave0.update();
  waveList.forEach( ( waveObj ) => waveObj.update() );
}

// オブジェクト描画
const objRender0 = () => {
  line.render( phenom_ctx );
  graphLine.render( graph1_ctx );
  graphLine.render( graph2_ctx );
  graphLine.render( graph3_ctx );
  srcBar0.render_border( bar_ctx );
  srcBar0.render_fill( bar_ctx );
  source0.render( bar_ctx );
  waveList.forEach( ( waveObj ) => waveObj.render( phenom_ctx ) );
}

// グラフ描画
const graphObjRender0 = () => {
  srcGraphLeft0.render( graph1_ctx );
  srcGraphRight0.render( graph1_ctx );
  srcGraphLeft0.render( graph3_ctx );
  srcGraphRight0.render( graph3_ctx );
}

// アニメーション描画
const loop0 = () => {
  clearCvs();

  objUpdate0();
  srcGraphObjCreate0();
  disp( 60.00, 0.00, 400.00 );

  objRender0();
  graphObjRender0();

  callbackId = window.requestAnimationFrame( loop0 );

  if ( source0.x >= phenom_cvs.width ) onResetButtonClick();
};
