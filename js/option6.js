// 音源
class Source6 {
  constructor(x) {
    this.x = x;
    this.actual_x = this.x + 40;
  }

  render(ctx) {
    ctx.drawImage(imgList[0], this.x, 207, 75, 75);
  }
}

// 観測者
class Observer6 {
  constructor(x) {
    this.x = x;
    this.actual_x = this.x + 30;
  }

  render(ctx) {
    ctx.drawImage(imgList[1], this.x, 215, 60, 60);
  }
}

// 見えないオブジェクト(音波が広がる基準)
class HiddenObj6 {
  constructor() {
    this.x = 0;
  }

  update() {
    this.x += 0.6;
  }
}

// 1番目の音波(描画しない)
class HiddenWave6 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (hiddenObj6.x >= 10) {
      this.radius += 1.4;
    }
  }
}

// 音波
class Wave6 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update(i) {
    if (hiddenObj6.x >= 46 + (36 * i)) {
      this.radius += 1.4;
    }
  }

  render(ctx) {
    ctx.strokeStyle = 'royalblue';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, 80, this.radius, 0, Math.PI * 2, true);
    ctx.stroke();
  }
}

// 音源の振動グラフ
class SrcGraph6 {
  constructor(start_x, width, dist, r, wl) {
    this.start_x = start_x;

    if (width <= 0) {
      this.width = 0;
    } else if (width >= graph1_cvs.width) {
      this.width = graph1_cvs.width;
    } else {
      this.width = width;
    }

    this.dist = dist;
    this.r = r;
    this.wl = wl;
  }

  render(ctx) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.start_x, this.r - this.r * Math.cos((2 * Math.PI / this.wl) * (this.dist - this.start_x)));
    if (this.start_x > this.width) {
      for (let x = 0; x <= this.start_x - this.width; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.wl) * (this.start_x - this.dist - x));
        ctx.lineTo(this.start_x - x, this.r - y);
      }
    } else {
      for (let x = 0; x <= this.width - this.start_x; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.wl) * (this.dist - this.start_x - x));
        ctx.lineTo(this.start_x + x, this.r - y);
      }
    }
    ctx.stroke();
  }
}

// 観測者の振動グラフ
class ObsGraph6 {
  constructor(start_x, width, dist, r, wl) {
    if (observer6.actual_x <= srcGraphRight6.start_x) {
      this.start_x = srcGraphRight6.start_x;
    } else {
      this.start_x = start_x;
    }

    if (width <= 0) {
      this.width = 0;
    } else if (width >= graph1_cvs.width) {
      this.width = graph1_cvs.width;
    } else {
      this.width = width;
    }

    this.dist = dist;
    this.r = r;
    this.wl = wl;
  }

  render(ctx) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.start_x, this.r - this.r * Math.cos((2 * Math.PI / this.wl) * (this.dist - this.start_x)));
    if (source6.actual_x > this.start_x) {
      for (let x = 0; x <= this.start_x - this.width; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.wl) * (this.start_x - this.dist - x));
        ctx.lineTo(this.start_x - x, this.r - y);
      }
    } else {
      for (let x = 0; x <= this.width - this.start_x; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.wl) * (this.dist - this.start_x - x));
        ctx.lineTo(this.start_x + x, this.r - y);
      }
    }
    ctx.stroke();
  }
}

// 各オブジェクト作成
const objCreate6 = () => {
  line = new Line();
  graphLine = new GraphLine();
  source6 = new Source6(210);
  observer6 = new Observer6(480);
  hiddenObj6 = new HiddenObj6();
  srcBar6 = new SrcBar(source6.actual_x);
  obsBar6 = new ObsBar(observer6.actual_x);
}

// 音波オブジェクト作成
const waveListStore6 = () => {
  hiddenWave6 = new HiddenWave6(250);
  for (let i = 0; i < phenom_cvs.width / 36; i++) {
    waveList.push(new Wave6(250));
  }
}

// 音源の振動グラフのオブジェクト作成
const srcGraphObjCreate6 = () => {
  srcGraphLeft6 = new SrcGraph6(
    waveList[waveList.length - 1].x - waveList[waveList.length - 1].radius,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave6.x - hiddenWave6.radius - (waveList[0].x - waveList[0].radius)
  );

  srcGraphRight6 = new SrcGraph6(
    waveList[waveList.length - 1].x + waveList[waveList.length - 1].radius,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave6.x + hiddenWave6.radius - (waveList[0].x + waveList[0].radius)
  );
};

// 観測者の振動グラフのオブジェクト作成
const obsGraphObjCreate6 = () => {
  obsGraphRight6 = new ObsGraph6(
    observer6.actual_x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph2_cvs.height / 2,
    hiddenWave6.x + hiddenWave6.radius - (waveList[0].x + waveList[0].radius)
  );
};

const audioObjCreate6 = () => {
  if (isAudioPlay) {
    if (Math.floor(observer6.actual_x) === Math.floor(waveList[waveList.length - 1].x + waveList[waveList.length - 1].radius)) {
      oscNode.stop();
      audioObj(0.00);
      oscNode.start();
    } else if (Math.floor(observer6.actual_x) === Math.floor(waveList[0].x + waveList[0].radius)) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    }
  } else {
    if (observer6.actual_x < waveList[waveList.length - 1].x + waveList[waveList.length - 1].radius) {
      oscNode.stop();
      audioObj(0.00);
      oscNode.start();
    } else if (waveList[0].radius > 0 && observer6.actual_x < waveList[0].x + waveList[0].radius) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    }
  }
}

// オブジェクト更新
const objUpdate6 = () => {
  hiddenObj6.update();
  hiddenWave6.update();
  srcBar6.update(source6.actual_x);
  obsBar6.update(observer6.actual_x);
  waveList.forEach((waveObj, i) => waveObj.update(i));
}

// オブジェクト描画
const objRender6 = () => {
  line.render(phenom_ctx);
  graphLine.render(graph1_ctx);
  graphLine.render(graph2_ctx);
  graphLine.render(graph3_ctx);
  srcBar6.render_border(bar_ctx);
  srcBar6.render_fill(bar_ctx);
  obsBar6.render_border(bar_ctx);
  obsBar6.render_fill(bar_ctx);
  source6.render(bar_ctx);
  observer6.render(bar_ctx);
  waveList.forEach((waveObj) => waveObj.render(phenom_ctx));
}

// グラフ描画
const graphObjRender6 = () => {
  srcGraphLeft6.render(graph1_ctx);
  srcGraphRight6.render(graph1_ctx);
  srcGraphLeft6.render(graph3_ctx);
  srcGraphRight6.render(graph3_ctx);
  obsGraphRight6.render(graph2_ctx);
  obsGraphRight6.render(graph3_ctx);
}

// アニメーション描画
const loop6 = () => {
  clearCvs();

  objUpdate6();
  srcGraphObjCreate6();
  obsGraphObjCreate6();
  audioObjCreate6();
  disp(0.00, 0.00, 400.00);

  objRender6();
  graphObjRender6();

  callbackId = window.requestAnimationFrame(loop6);

  if (srcGraphRight6.start_x >= phenom_cvs.width) onResetButtonClick();
};
