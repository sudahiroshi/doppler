// 音源
class Generator {
  constructor(x, velocity) {
    this.x = x;
    this.velocity = velocity;
  }

  update() {
    this.x += this.velocity;
  }

  render(ctx) {
    ctx.beginPath();
    var img = new Image();
    img.src = 'generator.svg';
    ctx.drawImage(img, this.x, 150, 30, 30);
    ctx.fill();
  }
}

// 観測者
class Observer {
  constructor(x, velocity) {
    this.x = x;
    this.velocity = velocity;
  }

  update() {
    this.x += this.velocity;
  }

  render(ctx) {
    ctx.beginPath();
    var img = new Image();
    img.src = 'observer.svg';
    ctx.drawImage(img, this.x, 150, 40, 40);
    ctx.fill();
  }
}

// 右側の音波
class RightWave {
  constructor(x, velocity) {
    this.x = x;
    this.velocity = velocity;
  }

  update() {
    this.x += this.velocity;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x - 60, 150, 100, -Math.PI / 5, Math.PI / 5);
    ctx.stroke();
  }
}

// 左側の音波
class LeftWave {
  constructor(x, velocity) {
    this.x = x;
    this.velocity = velocity;
  }

  update() {
    this.x -= this.velocity;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x + 90, 150, 100, (Math.PI / 5) * 4, -(Math.PI / 5) * 4);
    ctx.stroke();
  }
}
