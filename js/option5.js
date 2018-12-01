// 音源
class Source5 {
  constructor(x, vel) {
    this.x = x;
    this.actual_x = this.x + 40;
    this.vel = vel;
  }

  update() {
    this.x += this.vel;
    this.actual_x = this.x + 40;
  }

  render(ctx) {
    ctx.drawImage(imgList[0], this.x, 207, 75, 75);
  }
}

// 観測者
class Observer5 {
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
    ctx.drawImage(imgList[3], this.x, 215, 60, 60);
  }
}

// 1番目の音波(波長計算用)
class HiddenWave5 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (source5.actual_x >= this.x) {
      this.radius += 1.4;
    }
  }
}

// 音波
class Wave5 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (source5.actual_x >= this.x) {
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
class ObsWaveLeft5 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (observer5.actual_x <= this.x) {
      this.radius += 2.2;
    }
  }
}

// 観測者の音波右側(観測者のグラフ描画用)
class ObsWaveRight5 {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update() {
    if (observer5.actual_x <= this.x) {
      this.radius += 0.6;
    }
  }
}

// 音源の振動グラフ
class SrcGraph5 {
  constructor(start_x, width, dist, r, wl) {
    if (source5.actual_x >= start_x) {
      this.start_x = source5.actual_x;
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
class ObsGraph5 {
  constructor(start_x, width, dist, r, wl) {
    if (start_x === obsWaveRightList[8].x + obsWaveRightList[8].radius) {
      this.start_x = start_x;
    } else if (observer5.actual_x <= obsWaveRightList[0].x) {
      this.start_x = observer5.actual_x;
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
const objCreate5 = () => {
  line = new Line();
  graphLine = new GraphLine();
  source5 = new Source5(130, 0.4);
  observer5 = new Observer5(630, -0.4);
  srcBar5 = new SrcBar(source5.actual_x);
  obsBar5 = new ObsBar(observer5.actual_x);
}

const waveListStore5 = () => {
  hiddenWave5 = new HiddenWave5(180);
  for (let i = 0; i < phenom_cvs.width; i += 24) {
    waveList.push(new Wave5(204 + i));
  }

  hiddenObsWaveLeft5 = new ObsWaveLeft5(449);
  for (let i = 406; i > 0; i -= 43) {
    obsWaveLeftList.push(new ObsWaveLeft5(i));
  }

  hiddenObsWaveRight5 = new ObsWaveRight5(546.5);
  for (let i = 533; i > 0; i -= 13.5) {
    obsWaveRightList.push(new ObsWaveRight5(i));
  }
};

const srcGraphObjCreate5 = () => {
  srcGraphLeft5 = new SrcGraph5(
    waveList[0].x,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave5.x - hiddenWave5.radius - (waveList[0].x - waveList[0].radius)
  );

  srcGraphRight5 = new SrcGraph5(
    waveList[0].x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave5.x + hiddenWave5.radius - (waveList[0].x + waveList[0].radius)
  );
};

const obsGraphObjCreate5 = () => {
  obsGraphLeft5 = new ObsGraph5(
    obsWaveLeftList[0].x,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    obsWaveLeftList[0].x - obsWaveLeftList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveLeft5.x - hiddenObsWaveLeft5.radius - (obsWaveLeftList[0].x - obsWaveLeftList[0].radius)
  );

  obsGraphRight5 = new ObsGraph5(
    obsWaveRightList[0].x,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveRight5.x + hiddenObsWaveRight5.radius - (obsWaveRightList[0].x + obsWaveRightList[0].radius)
  );

  obsGraphRightAfter5 = new ObsGraph5(
    obsWaveRightList[8].x + obsWaveRightList[8].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    obsWaveRightList[0].x + obsWaveRightList[0].radius,
    graph2_cvs.height / 2,
    hiddenObsWaveRight5.x + hiddenObsWaveRight5.radius - (obsWaveRightList[0].x + obsWaveRightList[0].radius)
  );
};

const audioObjCreate5 = () => {
  if (isAudioPlay) {
    if (Math.floor(observer5.actual_x) === Math.floor(obsWaveLeftList[0].x)) {
      oscNode.stop();
      audioObj(315.79);
      oscNode.start();
    } else if (Math.floor(observer5.actual_x) === Math.floor(obsWaveRightList[8].x)) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    } else if (Math.floor(observer5.actual_x) === Math.floor(obsWaveRightList[0].x)) {
      oscNode.stop();
      audioObj(533.33);
      oscNode.start();
    }
  } else {
    if (obsWaveLeftList[0].radius > 0 && observer5.actual_x < obsWaveLeftList[0].x) {
      oscNode.stop();
      audioObj(315.79);
      oscNode.start();
    } else if (obsWaveRightList[8].radius > 0 && observer5.actual_x < obsWaveRightList[8].x) {
      oscNode.stop();
      audioObj(400.00);
      oscNode.start();
    } else if (obsWaveRightList[0].radius > 0 && observer5.actual_x < obsWaveRightList[0].x) {
      oscNode.stop();
      audioObj(533.33);
      oscNode.start();
    }
  }
}

const objUpdate5 = () => {
  source5.update();
  observer5.update();
  srcBar5.update(source5.actual_x);
  obsBar5.update(observer5.actual_x);
  hiddenWave5.update();
  waveList.forEach((waveObj) => waveObj.update());
  hiddenObsWaveLeft5.update();
  obsWaveLeftList.forEach((obsWaveLeftObj) => obsWaveLeftObj.update());
  hiddenObsWaveRight5.update();
  obsWaveRightList.forEach((obsWaveRightObj) => obsWaveRightObj.update());
}

const objRender5 = () => {
  line.render(phenom_ctx);
  graphLine.render(graph1_ctx);
  graphLine.render(graph2_ctx);
  graphLine.render(graph3_ctx);
  srcBar5.render_border(bar_ctx);
  srcBar5.render_fill(bar_ctx);
  obsBar5.render_border(bar_ctx);
  obsBar5.render_fill(bar_ctx);
  source5.render(bar_ctx);
  observer5.render(bar_ctx);
  waveList.forEach((waveObj) => waveObj.render(phenom_ctx));
}

const graphObjRender5 = () => {
  srcGraphLeft5.render(graph1_ctx);
  srcGraphRight5.render(graph1_ctx);
  srcGraphLeft5.render(graph3_ctx);
  srcGraphRight5.render(graph3_ctx);

  if (observer5.actual_x >= obsWaveRightList[8].x) {
    obsGraphRight5.render_right(graph2_ctx);
    obsGraphRight5.render_right(graph3_ctx);
  } else if (observer5.actual_x < obsWaveRightList[8].x && observer5.actual_x > obsWaveLeftList[0].x) {
    obsGraphRightAfter5.render_right(graph2_ctx);
    obsGraphRightAfter5.render_right(graph3_ctx);
  } else if (observer5.actual_x <= obsWaveLeftList[0].x) {
    obsGraphLeft5.render_left(graph2_ctx);
    obsGraphLeft5.render_left(graph3_ctx);
    obsGraphRightAfter5.render_right(graph2_ctx);
    obsGraphRightAfter5.render_right(graph3_ctx);
  }
}

const loop5 = () => {
  clearCvs();

  objUpdate5();
  srcGraphObjCreate5();
  obsGraphObjCreate5();
  audioObjCreate5();
  disp(40.00, -40.00, 400.00);

  objRender5();
  graphObjRender5();

  callbackId = window.requestAnimationFrame(loop5);

  if (observer5.actual_x <= 0) onResetButtonClick();
};
