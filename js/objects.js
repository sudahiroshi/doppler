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
    }
  }

  render(ctx) {
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, 85, this.radius, 0, Math.PI * 2, true);
    ctx.stroke();
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

  // render(ctx) {
  //   ctx.beginPath();
  //   ctx.fillRect(this.x, 70, 8, 8);
  // }
}

// グラフの点線
class GraphLine {
  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.setLineDash([7, 4]);
    ctx.moveTo(0, 40);
    ctx.lineTo(850, 40);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

// 音源の振動グラフ
class SrcGraph {
  constructor() {
    this.stop_left_vel = 0;
    this.stop_right_vel = 0;
    this.run_left_vel = 0;
    this.run_right_vel = 0;
    this.left_max_width = 0;
    this.right_max_width = 0;
  }

  update_run() {
    if (source.x >= 25) this.start_point = source.x + 38;
    this.run_left_vel += 1.4;
    this.run_right_vel -= 1.4;
    this.left_max_width = waveList[0].x - waveList[0].radius;
    if (this.left_max_width <= 0) this.left_max_width = 0;
    this.right_max_width = waveList[0].x + waveList[0].radius;
    if (this.right_max_width >= graph1_cvs.width) this.right_max_width = graph1_cvs.width;
  }

  render_run_left(ctx) {
    var r = graph1_cvs.height / 2;
    var T = waveList[1].x - waveList[1].radius - (waveList[0].x - waveList[0].radius);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.start_point, -r * Math.sin((2 * Math.PI / T) * this.run_left_vel) + r);
    for (var x = this.start_point; x >= this.left_max_width; x--) {
      var y = r * Math.sin((2 * Math.PI / T) * (this.run_left_vel + x));
      if (x === this.start_point) ctx.moveTo(x, y + r);
      ctx.lineTo(x, y + r);
    }
    ctx.stroke();
  }

  render_run_right(ctx) {
    var r = graph1_cvs.height / 2;
    var T = waveList[0].x + waveList[0].radius - (waveList[1].x + waveList[1].radius);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.start_point, -r * Math.sin((2 * Math.PI / T) * this.run_right_vel) + r);
    for (var x = this.start_point; x <= this.right_max_width; x++) {
      var y = r * Math.sin((2 * Math.PI / T) * (this.run_right_vel + x));
      if (x === this.start_point) ctx.moveTo(x, y + r);
      ctx.lineTo(x, y + r);
    }
    ctx.stroke();
  }

  update_stop() {
    this.start_point = source.x + 38;
    this.stop_left_vel++;
    this.stop_right_vel--;
    this.left_max_width = waveList[0].x - this.stop_left_vel;
    if (this.left_max_width <= 0) this.left_max_width = 0;
    this.right_max_width = waveList[0].x - this.stop_right_vel;
    if (this.right_max_width >= graph1_cvs.width) this.right_max_width = graph1_cvs.width;
  }

  render_stop_left(ctx) {
    var r = graph1_cvs.height / 2;
    var T = 58.33;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.start_point, -r * Math.sin((2 * Math.PI / T) * this.stop_left_vel) + r);
    for (var x = this.start_point; x >= this.left_max_width; x--) {
      var y = -r * Math.sin((2 * Math.PI / T) * (this.stop_left_vel + x));
      if (x === this.start_point) ctx.moveTo(x, y + r);
      ctx.lineTo(x, y + r);
    }
    ctx.stroke();
  }

  render_stop_right(ctx) {
    var r = graph1_cvs.height / 2;
    var T = 58.33;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.start_point, -r * Math.sin((2 * Math.PI / T) * this.stop_right_vel) + r);
    for (var x = this.start_point; x <= this.right_max_width; x++) {
      var y = -r * Math.sin((2 * Math.PI / T) * (this.stop_right_vel + x));
      if (x === this.start_point) ctx.moveTo(x, y + r);
      ctx.lineTo(x, y + r);
    }
    ctx.stroke();
  }
}
