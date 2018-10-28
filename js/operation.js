let clickCount = 0,
  callbackId = 0,
  option = parseInt(document.getElementById('select-box').value),
  isMoving = false,
  waveList = [],
  time = 0,
  nowTime = 0,
  lastTime = 0;

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
  graph3_ctx = graph3_cvs.getContext('2d');

// ロード時の描画
window.onload = () => imgList.onload = onResetButtonClick();

// セレクトボックスの値が選択されたときの描画
const onChangeSelectBox = () => onResetButtonClick();

// スタートボタンを押したときの描画
const onStartButtonClick = () => {
  clickCount++;

  if (clickCount === 1) waveListStore();

  if (!isMoving) {
    // アニメーション開始・再開
    loop();
    isMoving = true;
  } else {
    // アニメーション一時停止
    window.cancelAnimationFrame(callbackId);
    isMoving = false;
  }
};

// リセットボタンを押したときの描画
const onResetButtonClick = () => {
  window.cancelAnimationFrame(callbackId);

  phenom_ctx.clearRect(0, 0, phenom_cvs.width, phenom_cvs.height);
  graph1_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);
  graph2_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);
  graph3_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);

  clickCount = 0;
  callbackId = 0;
  option = parseInt(document.getElementById('select-box').value);
  isMoving = false;
  waveList = [];

  objStore();
  objRender();
};
