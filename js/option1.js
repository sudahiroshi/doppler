// 音源
class Source1 {
  constructor(x, vel) {
    this.x = x;
    this.actual_x = this.x + 40;
    this.vel = vel;
  }

  update() {
    this.x += this.vel;
    this.actual_x += this.vel;
  }

  render(ctx) {
    ctx.drawImage(imgList[0], this.x, 207, 75, 75);
  }
}

// 観測者
class Observer1 {
  constructor(x) {
    this.x = x;
    this.actual_x = this.x + 30;
  }

  render(ctx) {
    ctx.drawImage(imgList[1], this.x, 215, 60, 60);
  }
}

// 1番目の音波(描画しない)
class HiddenWave1 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (source1.actual_x >= this.x) {
      this.radius += 1.4;
    }
  }
}

// 音波
class Wave1 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (source1.actual_x >= this.x) {
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
class SrcGraph1 {
  constructor(start_x, width, dist, r, wl) {
    if (source1.actual_x >= start_x) {
      this.start_x = source1.actual_x;
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
class ObsGraph1 {
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

  render_left(ctx) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.start_x, this.r - this.r * Math.cos((2 * Math.PI / this.wl) * (this.dist - this.start_x)));
    for (let x = 0; x <= this.start_x - this.width; x++) {
      const y = this.r * Math.cos((2 * Math.PI / this.wl) * (this.start_x - this.dist - x));
      ctx.lineTo(this.start_x - x, this.r - y);
    }
    ctx.stroke();
  }

  render_right(ctx) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.start_x, this.r - this.r * Math.cos((2 * Math.PI / this.wl) * (this.dist - this.start_x)));
    for (let x = 0; x <= this.width - this.start_x; x++) {
      const y = this.r * Math.cos((2 * Math.PI / this.wl) * (this.dist - this.start_x - x));
      ctx.lineTo(this.start_x + x, this.r - y);
    }
    ctx.stroke();
  }
}

// 各オブジェクト作成
const objCreate1 = () => {
  line = new Line();
  graphLine = new GraphLine();
  source1 = new Source1(10, 0.6);
  observer1 = new Observer1(395);
  srcBar1 = new SrcBar(source1.actual_x);
  obsBar1 = new ObsBar(observer1.actual_x);
}

// 音波オブジェクト作成
const waveListStore1 = () => {
  hiddenWave1 = new HiddenWave1(72);
  for (let i = 0; i < phenom_cvs.width; i += 36) {
    waveList.push(new Wave1(108 + i));
  }
}

// 音源の振動グラフのオブジェクト作成
const srcGraphObjCreate1 = () => {
  srcGraphLeft1 = new SrcGraph1(
    waveList[0].x,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave1.x - hiddenWave1.radius - (waveList[0].x - waveList[0].radius)
  );

  srcGraphRight1 = new SrcGraph1(
    waveList[0].x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave1.x + hiddenWave1.radius - (waveList[0].x + waveList[0].radius)
  );
};

// 観測者の振動グラフのオブジェクト作成
const obsGraphObjCreate1 = () => {
  obsGraphLeft1 = new ObsGraph1(
    observer1.actual_x,
    waveList[9].x - waveList[9].radius,
    waveList[9].x - waveList[9].radius,
    graph2_cvs.height / 2,
    hiddenWave1.x - hiddenWave1.radius - (waveList[0].x - waveList[0].radius)
  );

  obsGraphRight1 = new ObsGraph1(
    observer1.actual_x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph2_cvs.height / 2,
    hiddenWave1.x + hiddenWave1.radius - (waveList[0].x + waveList[0].radius)
  );

  obsGraphRightAfter1 = new ObsGraph1(
    waveList[8].x + waveList[8].radius,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph2_cvs.height / 2,
    hiddenWave1.x + hiddenWave1.radius - (waveList[0].x + waveList[0].radius)
  );
};

const audioObjCreate1 = () => {
  if (isAudioPlay) {
    if (Math.floor(observer1.actual_x) === Math.floor(waveList[9].x - waveList[9].radius)) {
      oscNode.stop();
      audioObj(340.00);
      oscNode.start();
    } else if (Math.floor(observer1.actual_x) === Math.floor(waveList[8].x + waveList[8].radius)) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    } else if (Math.floor(observer1.actual_x) === Math.floor(waveList[0].x + waveList[0].radius)) {
      oscNode.stop();
      audioObj(485.71);
      oscNode.start(0);
    }
  } else {
    if (waveList[9].radius > 0 && observer1.actual_x > waveList[9].x - waveList[9].radius) {
      oscNode.stop();
      audioObj(340.00);
      oscNode.start();
    } else if (waveList[8].radius > 0 && observer1.actual_x < waveList[8].x + waveList[8].radius) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    } else if (waveList[0].radius > 0 && observer1.actual_x < waveList[0].x + waveList[0].radius) {
      oscNode.stop();
      audioObj(485.71);
      oscNode.start();
    }
  }
}

// オブジェクト更新
const objUpdate1 = () => {
  source1.update();
  srcBar1.update(source1.actual_x);
  obsBar1.update(observer1.actual_x);
  hiddenWave1.update();
  waveList.forEach((waveObj) => waveObj.update());
}

// オブジェクト描画
const objRender1 = () => {
  line.render(phenom_ctx);
  graphLine.render(graph1_ctx);
  graphLine.render(graph2_ctx);
  graphLine.render(graph3_ctx);
  srcBar1.render_border(bar_ctx);
  srcBar1.render_fill(bar_ctx);
  obsBar1.render_border(bar_ctx);
  obsBar1.render_fill(bar_ctx);
  source1.render(bar_ctx);
  observer1.render(bar_ctx);
  waveList.forEach((waveObj) => waveObj.render(phenom_ctx));
}

// グラフ描画
const graphObjRender1 = () => {
  srcGraphLeft1.render(graph1_ctx);
  srcGraphRight1.render(graph1_ctx);
  srcGraphLeft1.render(graph3_ctx);
  srcGraphRight1.render(graph3_ctx);

  if (observer1.actual_x >= waveList[8].x + waveList[8].radius) {
    obsGraphRight1.render_right(graph2_ctx);
    obsGraphRight1.render_right(graph3_ctx);
  } else {
    obsGraphLeft1.render_left(graph2_ctx);
    obsGraphLeft1.render_left(graph3_ctx);
    obsGraphRightAfter1.render_right(graph2_ctx);
    obsGraphRightAfter1.render_right(graph3_ctx);
  }
}

// アニメーション描画
const loop1 = () => {
  clearCvs();

  objUpdate1();
  srcGraphObjCreate1();
  obsGraphObjCreate1();
  audioObjCreate1();
  disp(60.00, 0.00, 400.00);

  objRender1();
  graphObjRender1();

  callbackId = window.requestAnimationFrame(loop1);

  if (source1.x >= phenom_cvs.width) onResetButtonClick();
};
