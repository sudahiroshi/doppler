// 地面
class Line {
  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(0, 140);
    ctx.lineTo(850, 140);
    ctx.stroke();
  }
}

// 音源
class Source {
  constructor(x, vel) {
    this.x = x;
    this.actual_x = 0;
    this.vel = vel;
  }

  update() {
    this.x += this.vel;
    this.actual_x = Math.ceil(this.x + 40);
  }

  render(ctx) {
    ctx.drawImage(imgList[0], this.x, 72, 75, 75);
  }
}

// 観測者
class Observer {
  constructor(x, vel) {
    this.x = x;
    this.vel = vel;
  }

  update() {
    this.x += this.vel;
  }

  render(ctx) {
    if (this.vel === 0) {
      ctx.drawImage(imgList[1], this.x, 80, 60, 60);
    } else if (this.vel > 0) {
      ctx.drawImage(imgList[2], this.x, 80, 60, 60);
    } else {
      ctx.drawImage(imgList[3], this.x, 80, 60, 60);
    }
  }
}

// 見えないオブジェクト
class HiddenObj {
  constructor() {
    this.x = 0;
  }

  update() {
    this.x += 0.6;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, 80, 5, 5);
  }
}

// 音波
class Wave {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update(source_actual_x) {
    if (source.vel === 0) {
      if (observer.vel !== 0 && observer.x >= 36) {
        this.radius++;
      } else if (observer.vel === 0 && hiddenObj.x >= 10) {
        this.radius++;
      }
    } else {
      if (source_actual_x >= this.x)
        this.radius += 1.4;
    }
  }

  update_stop(i) {
    if (source.vel === 0 && observer.vel !== 0) {
      if (observer.x >= 72 + (36 * i)) {
        this.radius++;
      }
    } else {
      if (hiddenObj.x >= 46 + (36 * i)) {
        this.radius++;
      }
    }
  }

  render(ctx) {
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, 80, this.radius, 0, Math.PI * 2, true);
    ctx.stroke();
  }
}

// グラフの点線
class GraphLine {
  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.setLineDash([7, 4]);
    ctx.moveTo(0, 40);
    ctx.lineTo(850, 40);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

// 音源の振動グラフ
class SrcGraph {
  constructor(start_x, width, vel, r, t) {
    this.start_x = start_x;
    this.width = width;
    this.vel = vel;
    this.r = r;
    this.t = t;
  }

  update() {
    if (source.actual_x >= waveList[0].x) this.start_x = source.actual_x;
    if (this.width <= 0) this.width = 0;
    if (this.width >= graph1_cvs.width) this.width = graph1_cvs.width;
  }

  render(ctx) {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(this.start_x, this.r - this.r * Math.cos((2 * Math.PI / this.t) * (this.vel - this.start_x)));
    if (this.start_x > this.width) {
      for (let x = 0; x <= this.start_x - this.width; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.t) * (this.start_x - this.vel - x));
        ctx.lineTo(this.start_x - x, this.r - y);
      }
    } else {
      for (let x = 0; x <= this.width - this.start_x; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.t) * (this.vel - this.start_x - x));
        ctx.lineTo(this.start_x + x, this.r - y);
      }
    }
    ctx.stroke();
  }
}

// 観測者の振動グラフ
class ObsGraph {
  constructor(start_x, width, vel, r) {
    this.start_x = start_x;
    this.width = width;
    this.vel = vel;
    this.r = r;
  }

  update() {
    if (this.width <= 0) this.width = 0;
    if (this.width >= graph2_cvs.width) this.width = graph2_cvs.width;
    if (source.actual_x < observer.x + 30) {
      this.t = srcGraphRight.t * ((1.4 - source.vel) / (1.4 - observer.vel));
    } else {
      this.t = srcGraphLeft.t * ((1.4 + source.vel) / (1.4 + observer.vel));
    }
  }

  render(ctx) {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(this.start_x, this.r - this.r * Math.cos((2 * Math.PI / this.t) * (this.vel - this.start_x)));
    if (this.start_x <= source.actual_x && this.start_x >= this.width) {
      for (let x = 0; x <= this.start_x - this.width; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.t) * (this.start_x - this.vel - x));
        ctx.lineTo(this.start_x - x, this.r - y);
      }
    } else if (this.start_x >= source.actual_x && this.start_x <= this.width) {
      for (let x = 0; x <= this.width - this.start_x; x++) {
        const y = this.r * Math.cos((2 * Math.PI / this.t) * (this.start_x - this.vel + x));
        ctx.lineTo(this.start_x + x, this.r - y);
      }
    }
    ctx.stroke();
  }

  // render(ctx) {
  //   ctx.strokeStyle = 'green';
  //   ctx.beginPath();
  //   ctx.moveTo(this.start_x, this.r - this.r * Math.cos((2 * Math.PI / this.t) * (this.start_x - this.vel)));
  //   if (this.start_x <= source.actual_x && this.start_x >= this.width) {
  //     for (let x = 0; x <= this.start_x - this.width; x++) {
  //       const y = this.r * Math.cos((2 * Math.PI / this.t) * (this.start_x - this.vel - x));
  //       ctx.lineTo(this.start_x - x, this.r - y);
  //     }
  //   } else if (this.start_x >= source.actual_x && this.start_x <= this.width) {
  //     for (let x = 0; x <= this.width - this.start_x; x++) {
  //       const y = this.r * Math.cos((2 * Math.PI / this.t) * (this.start_x - this.vel + x));
  //       ctx.lineTo(this.start_x + x, this.r - y);
  //     }
  //   }
  //   ctx.stroke();
  // }
}
