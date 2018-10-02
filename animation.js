var clickCount = 0;
var isMoving = false;
var waveList = [];
var callbackId;

// canvas取得
var cvs = document.getElementById("phenom-cv");
var ctx = cvs.getContext("2d");

// ロード時の描画
window.onload = function() {
  line = new Line();
  source = new Source(10, .6);
  observer = new Observer(425, .3);

  line.render(ctx);
  source.render(ctx);
  observer.render_stop(ctx);
}

// セレクトボックスの値が変化したときの描画
function onChangeSelectBox() {
  if (clickCount === 0) {
    var option = document.getElementById("select-box").value;

    if (option === "1") {
      line = new Line();
      source = new Source(10, .6);
      observer = new Observer(425, .3);

      line.render(ctx);
      source.render(ctx);
      observer.render_stop(ctx);
    }
  }
}

// スタートボタンを押したときの描画
function onStartButtonClick() {
  clickCount++;

  if (clickCount === 1) {
    source = new Source(10, .6);
    observer = new Observer(425, .3);
    for (var i = 0; i < 850; i += 35) {
      waveList.push(new Wave(60 + i, 100));
    }
  }

  if (!isMoving) {
    isMoving = true;
    ctx.restore();

    // アニメーションの描画
    (function loop() {
      ctx.clearRect(0, 0, 850, 170);

      line.render(ctx);

      source.update();
      source.render(ctx);

      observer.render_stop(ctx);

      waveList.forEach((wave) => wave.update(source.x));
      waveList.forEach((wave) => wave.render(ctx));

      ctx.save();
      callbackId = window.requestAnimationFrame(loop);
    }());
  } else {
    isMoving = false;
    ctx.save();
    window.cancelAnimationFrame(callbackId);
  }
}

// リセットボタンを押したときの描画
function onResetButtonClick() {
  clickCount = 0;
  isMoving = false;

  window.cancelAnimationFrame(callbackId);
  ctx.clearRect(0, 0, 850, 170);

  line = new Line();
  source = new Source(10, .6);
  observer = new Observer(425, .3);

  line.render(ctx);
  source.render(ctx);
  observer.render_stop(ctx);
  // ctx.save();
}
