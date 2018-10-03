var clickCount = 0;
var option = 0;
var isMoving = false;
var waveList = [];
var callbackId;

// 再現エリアのcanvas取得
var phenom_cvs = document.getElementById("phenom-cvs");
var phenom_ctx = phenom_cvs.getContext("2d");

// ロード時の描画
window.onload = function() {
  onChangeSelectBox();
}

// セレクトボックスの値が選択されたときの描画
function onChangeSelectBox() {
  onResetButtonClick();

  phenom_ctx.clearRect(0, 0, phenom_cvs.width, phenom_cvs.height);
  option = parseInt(document.getElementById("select-box").value);

  objStore();
}

// スタートボタンを押したときの描画
function onStartButtonClick() {
  clickCount++;

  if (clickCount === 1) waveListStore();

  if (!isMoving) {
    // アニメーション開始・再開
    isMoving = true;
    // phenom_ctx.restore();

    loop();
  } else {
    // アニメーション一時停止
    isMoving = false;

    // phenom_ctx.save();
    window.cancelAnimationFrame(callbackId);
  }
}

// リセットボタンを押したときの描画
function onResetButtonClick() {
  clickCount = 0;
  isMoving = false;
  waveList = [];

  window.cancelAnimationFrame(callbackId);
  phenom_ctx.clearRect(0, 0, phenom_cvs.width, phenom_cvs.height);

  objStore();
}
