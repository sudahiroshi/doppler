// 地面
class Line {
  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 140);
    ctx.lineTo(850, 140);
    ctx.stroke();
  }
}

// 音源
class Source {
  constructor(x, vel) {
    this.x = x;
    this.vel = vel;
  }

  update() {
    this.x += this.vel;
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

  update_reverse() {
    this.x -= this.vel;
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

// 音波
class Wave {
  constructor(x) {
    this.x = x;
    this.radius = 0;
  }

  update(source_x) {
    if (source_x >= this.x - 45) {
      this.radius += 1.4;
    } else {
      this.radius = 0;
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.arc(this.x, 85, this.radius, 0, Math.PI * 2, true);
    ctx.stroke();
  }
}

class HiddenObj {
  constructor() {
    this.x = 0;
  }

  update() {
    this.x += 0.6;
  }

  // render(ctx) {
  //   ctx.beginPath();
  //   ctx.fillRect(this.x, 70, 8, 8);
  // }
}
