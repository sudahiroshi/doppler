// 地面の線
class Line {
  render(ctx) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 140);
    ctx.lineTo(850, 140);
    ctx.stroke();
  }
}

// グラフの点線
class GraphLine {
  render(ctx) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.setLineDash([7, 4]);
    ctx.moveTo(0, 40);
    ctx.lineTo(850, 40);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

class SrcBar {
  constructor(x) {
    this.x = x;
  }

  update(x) {
    this.x = x;
  }

  render_border(ctx) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeRect(this.x - 1.5, 1, 3, 509);
    ctx.stroke();
  }

  render_fill(ctx) {
    ctx.fillStyle = 'lightcoral';
    ctx.beginPath();
    ctx.fillRect(this.x - 1.5, 1, 3, 509);
    ctx.stroke();
  }
}

class ObsBar {
  constructor(x) {
    this.x = x;
  }

  update(x) {
    this.x = x;
  }

  render_border(ctx) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeRect(this.x - 1.5, 1, 3, 509);
    ctx.stroke();
  }

  render_fill(ctx) {
    ctx.fillStyle = 'darkseagreen';
    ctx.beginPath();
    ctx.fillRect(this.x - 1.5, 1, 3, 509);
    ctx.stroke();
  }
}

// 再現エリアのcanvas取得
const phenom_cvs = document.getElementById('phenom-cvs'),
  phenom_ctx = phenom_cvs.getContext('2d'),

  // 音源の振動グラフのcanvas取得
  graph1_cvs = document.getElementById('graph1-cvs'),
  graph1_ctx = graph1_cvs.getContext('2d'),

  // 観測者の振動グラフのcanvas取得
  graph2_cvs = document.getElementById('graph2-cvs'),
  graph2_ctx = graph2_cvs.getContext('2d'),

  // 両者の振動グラフのcanvas取得
  graph3_cvs = document.getElementById('graph3-cvs'),
  graph3_ctx = graph3_cvs.getContext('2d'),

  bar_cvs = document.getElementById('bar-cvs'),
  bar_ctx = bar_cvs.getContext('2d');

const clearCvs = () => {
  phenom_ctx.clearRect(0, 0, phenom_cvs.width, phenom_cvs.height);
  graph1_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);
  graph2_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);
  graph3_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);
  bar_ctx.clearRect(0, 0, bar_cvs.width, bar_cvs.height);
}

const audioObj = freq => {
  window.AudioContext = window.webkitAudioContext || window.AudioContext;
  audio_ctx = new AudioContext();
  oscNode = new OscillatorNode(audio_ctx);
  oscNode.frequency.value = freq;
  oscNode.connect(audio_ctx.destination);
}

const disp = (source_vel, observer_vel, source_freq) => {
  document.getElementById('source-vel').innerHTML = source_vel.toFixed(2);
  document.getElementById('observer-vel').innerHTML = observer_vel.toFixed(2);
  document.getElementById('source-freq').innerHTML = source_freq.toFixed(2);
  document.getElementById('observer-freq').innerHTML = oscNode.frequency.value.toFixed(2);
}
