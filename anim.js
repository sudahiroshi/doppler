var isMoving = false;
var isReset = false;
var clickCount = 0;
var callbackId;
var waveList = [];

// ロード時の描画
window.onload = function() {
  var cvs = document.getElementById("phenom-cv");
  var ctx = cvs.getContext("2d");

  line = new Line();
  source = new Source(10, .6);
  observer = new Observer(400, .3);

  line.render(ctx);
  source.render(ctx);
  observer.render_stop(ctx);
}

// スタートボタンを押したときの描画
function onStartButtonClick() {
  var cvs = document.getElementById("phenom-cv");
  var ctx = cvs.getContext("2d");
  clickCount++;

  if (clickCount === 1) {
    var freq = parseFloat(document.getElementById("pitch").value);
    var source_vel = parseFloat(document.getElementById("source-vel").value);
    var observer_vel = parseFloat(document.getElementById("observer-vel").value);

    source = new Source(10, source_vel);
    observer = new Observer(400, observer_vel);
    for (var i = 0; i < 850; i += freq) {
      waveList.push(new Wave(60 + i, 100));
    }
  }

  if (!isMoving && !isReset) {
    isMoving = true;
    ctx.restore();

    // アニメーションの描画
    (function loop() {
      ctx.clearRect(0, 0, 850, 170);

      line.render(ctx);

      source.update();
      source.render(ctx);

      if (source.x < 200) {
        observer.render_stop(ctx);
      } else {
        observer.update();
        observer.render_run(ctx);
      }

      waveList.forEach((wave) => wave.update(source.x));
      waveList.forEach((wave) => wave.render(ctx));
      ctx.save();

      callbackId = window.requestAnimationFrame(loop);
    }());
  } else if (isMoving && !isReset) {
    isMoving = false;
    ctx.save();
    window.cancelAnimationFrame(callbackId);
  }
}

function onResetButtonClick() {
  isReset = true;
  var cvs = document.getElementById("phenom-cv");
  var ctx = cvs.getContext("2d");

  window.cancelAnimationFrame(callbackId);
  ctx.clearRect(0, 0, 850, 170);
  ctx.save();
}
