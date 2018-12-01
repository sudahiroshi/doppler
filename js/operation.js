let clickCount       = 0,
    callbackId       = 0,
    option           = parseInt( document.getElementById( 'select-box' ).value ),
    isMoving         = false,
    isAudioPlay      = false,
    waveList         = [],
    obsWaveLeftList  = [],
    obsWaveRightList = [];

// ロード時の描画
window.onload = () => {
  audioObj( 0.00 );
  oscNode.start();
  imgList.onload = onResetButtonClick();
}

// セレクトボックスの値が選択されたときの描画
const onChangeSelectBox = () => onResetButtonClick();

// スタートボタンを押したときの描画
const onStartButtonClick = () => {
  clickCount++;

  if ( clickCount === 1 ) waveListStore[option]();

  if ( !isMoving ) {
    // アニメーション開始・再開
    loop[option]();
    isMoving    = true;
    isAudioPlay = true;
  } else {
    // アニメーション一時停止
    window.cancelAnimationFrame( callbackId );
    oscNode.stop();
    isMoving    = false;
    isAudioPlay = false;
  }
};

// リセットボタンを押したときの描画
const onResetButtonClick = () => {
  window.cancelAnimationFrame( callbackId );

  clearCvs();
  oscNode.stop();

  clickCount       = 0;
  callbackId       = 0;
  option           = parseInt( document.getElementById( 'select-box' ).value );
  isMoving         = false;
  isAudioPlay      = false;
  waveList         = [];
  obsWaveLeftList  = [];
  obsWaveRightList = [];

  objCreate[option]();
  objRender[option]();

  audioObj( 0.00 );
  oscNode.start();

  disp( 0.00, 0.00, 0.00 );
};

// ショートカットキー
document.onkeydown = e => {
  document.activeElement.blur();
  if ( e.keyCode === 27 ) onResetButtonClick();
  if ( e.keyCode === 32 ) onStartButtonClick();
  if ( e.keyCode === 16 ) document.getElementById( 'select-box' ).focus();
}
