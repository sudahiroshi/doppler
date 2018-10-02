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

  render_stop(ctx) {
    ctx.drawImage(imgList[1], this.x, 80, 60, 60);
  }

  render_run(ctx) {
    ctx.drawImage(imgList[2], this.x, 80, 60, 60);
  }
}

// 音波
class Wave {
  constructor(x, radius) {
    this.x = x;
    this.radius = radius;
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
