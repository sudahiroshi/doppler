// 音源
class Source2 {
  constructor(x) {
    this.x = x;
    this.actual_x = this.x + 40;
  }

  render(ctx) {
    ctx.drawImage(imgList[0], this.x, 207, 75, 75);
  }
}

// 観測者
class Observer2 {
  constructor(x, vel) {
    this.x = x;
    this.actual_x = this.x + 30;
    this.vel = vel;
  }

  update() {
    this.x += this.vel;
    this.actual_x = this.x + 30;
  }

  render(ctx) {
    ctx.drawImage(imgList[2], this.x, 215, 60, 60);
  }
}

// 1番目の音波(波長計算用)
class HiddenWave2 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (observer2.x >= 36) {
      this.radius += 1.4;
    }
  }
}

// 音波
class Wave2 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update(i) {
    if (observer2.x >= 72 + (36 * i)) {
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

// 観測者の音波左側(観測者のグラフ描画用)
class ObsWaveLeft2 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (observer2.actual_x >= this.x) {
      this.radius += 0.8;
    }
  }
}

// 観測者の音波右側(観測者のグラフ描画用)
class ObsWaveRight2 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (observer2.actual_x >= this.x) {
      this.radius += 2;
    }
  }
}

// 音源の振動グラフ
class SrcGraph2 {
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
class ObsGraph2 {
  constructor(start_x, width, dist, r, wl) {
    if (start_x === obsWaveLeftList[8].x - obsWaveLeftList[8].radius) {
      this.start_x = start_x;
    } else if (observer2.actual_x >= obsWaveLeftList[0].x) {
      this.start_x = observer2.actual_x;
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
const objCreate2 = () => {
  line = new Line();
  graphLine = new GraphLine();
  source2 = new Source2(385);
  observer2 = new Observer2(10, 0.6);
  srcBar2 = new SrcBar(source2.actual_x);
  obsBar2 = new ObsBar(observer2.actual_x);
}

const waveListStore2 = () => {
  hiddenWave2 = new HiddenWave2(425);
  for (let i = 0; i < phenom_cvs.width / 36; i++) {
    waveList.push(new Wave2(425));
  }

  hiddenObsWaveLeft2 = new ObsWaveLeft2(174.8);
  for (let i = 0; i < phenom_cvs.width; i += 25.2) {
    obsWaveLeftList.push(new ObsWaveLeft2(200 + i));
  }

  hiddenObsWaveRight2 = new ObsWaveRight2(365);
  for (let i = 0; i < phenom_cvs.width; i += 63) {
    obsWaveRightList.push(new ObsWaveRight2(428 + i));
  }
};

const srcGraphObjCreate2 = () => {
  srcGraphLeft2 = new SrcGraph2(
    waveList[0].x,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave2.x - hiddenWave2.radius - (waveList[0].x - waveList[0].radius)
  );

  srcGraphRight2 = new SrcGraph2(
    waveList[0].x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave2.x + hiddenWave2.radius - (waveList[0].x + waveList[0].radius)
  );
};

const obsGraphObjCreate2 = () => {
  obsGraphLeft2 = new ObsGraph2(
    obsWaveLeftList[0].x,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveLeft2.x - hiddenObsWaveLeft2.radius - (obsWaveLeftList[0].x - obsWaveLeftList[0].radius)
  );

  obsGraphLeftAfter2 = new ObsGraph2(
    obsWaveLeftList[8].x - obsWaveLeftList[8].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveLeft2.x - hiddenObsWaveLeft2.radius - (obsWaveLeftList[0].x - obsWaveLeftList[0].radius)
  );

  obsGraphRight2 = new ObsGraph2(
    obsWaveRightList[0].x,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveRight2.x + hiddenObsWaveRight2.radius - (obsWaveRightList[0].x + obsWaveRightList[0].radius)
  );
};

const audioObjCreate2 = () => {
  if (isAudioPlay) {
    if (Math.floor(observer2.actual_x) === Math.floor(obsWaveRightList[0].x)) {
      oscNode.stop();
      audioObj(329.41);
      oscNode.start();
    } else if (Math.floor(observer2.actual_x) === Math.floor(obsWaveLeftList[8].x)) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    } else if (Math.ceil(observer2.actual_x) === Math.ceil(obsWaveLeftList[0].x)) {
      oscNode.stop();
      audioObj(470.59);
      oscNode.start();
    }
  } else {
    if (obsWaveRightList[0].radius > 0 && observer2.actual_x > obsWaveRightList[0].x) {
      oscNode.stop();
      audioObj(329.41);
      oscNode.start();
    } else if (obsWaveLeftList[8].radius > 0 && observer2.actual_x > obsWaveLeftList[8].x) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    } else if (obsWaveLeftList[0].radius > 0 && observer2.actual_x > obsWaveLeftList[0].x) {
      oscNode.stop();
      audioObj(470.59);
      oscNode.start();
    }
  }
}

const objUpdate2 = () => {
  observer2.update();
  hiddenWave2.update();
  srcBar2.update(source2.actual_x);
  obsBar2.update(observer2.actual_x);
  waveList.forEach((waveObj, i) => waveObj.update(i));
  hiddenObsWaveLeft2.update();
  obsWaveLeftList.forEach((obsWaveLeftObj) => obsWaveLeftObj.update());
  hiddenObsWaveRight2.update();
  obsWaveRightList.forEach((obsWaveRightObj) => obsWaveRightObj.update());
}

const objRender2 = () => {
  line.render(phenom_ctx);
  graphLine.render(graph1_ctx);
  graphLine.render(graph2_ctx);
  graphLine.render(graph3_ctx);
  srcBar2.render_border(bar_ctx);
  srcBar2.render_fill(bar_ctx);
  obsBar2.render_border(bar_ctx);
  obsBar2.render_fill(bar_ctx);
  source2.render(bar_ctx);
  observer2.render(bar_ctx);
  waveList.forEach((waveObj) => waveObj.render(phenom_ctx));
}

const graphObjRender2 = () => {
  srcGraphLeft2.render(graph1_ctx);
  srcGraphRight2.render(graph1_ctx);
  srcGraphLeft2.render(graph3_ctx);
  srcGraphRight2.render(graph3_ctx);

  if (observer2.actual_x <= obsWaveLeftList[8].x) {
    obsGraphLeft2.render_left(graph2_ctx);
    obsGraphLeft2.render_left(graph3_ctx);
  } else if (observer2.actual_x >= obsWaveLeftList[8].x && observer2.actual_x <= source2.actual_x) {
    obsGraphLeftAfter2.render_left(graph2_ctx);
    obsGraphLeftAfter2.render_left(graph3_ctx);
  } else {
    obsGraphLeftAfter2.render_left(graph2_ctx);
    obsGraphLeftAfter2.render_left(graph3_ctx);
    obsGraphRight2.render_right(graph2_ctx);
    obsGraphRight2.render_right(graph3_ctx);
  }
}

const loop2 = () => {
  clearCvs();

  objUpdate2();
  srcGraphObjCreate2();
  obsGraphObjCreate2();
  audioObjCreate2();
  disp(0.00, 60.00, 400.00);

  objRender2();
  graphObjRender2();

  callbackId = window.requestAnimationFrame(loop2);

  if (observer2.x >= phenom_cvs.width) onResetButtonClick();
};
