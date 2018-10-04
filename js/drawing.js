// オブジェクト作成
function objects(source_x, source_vel, observer_x, observer_vel) {
  line = new Line();
  source = new Source(source_x, source_vel);
  observer = new Observer(observer_x, observer_vel);
  hiddenObj = new HiddenObj();
  objectsRender();
}

// 共通の描画
function objectsRender() {
  line.render(phenom_ctx);
  source.render(phenom_ctx);
  observer.render(phenom_ctx);
}

// 各場合毎のオブジェクト定義と初期画面描画
function objStore() {
  if (option === 1) objects(10, 0.6, 395, 0);
  else if (option === 3) objects(385, 0, 10, 0.6);
  else if (option === 5) objects(10, 0.6, 250, 0.3);
  else if (option === 6) objects(130, 0.4, 10, 0.6);
  else if (option === 7) objects(130, 0.4, 630, -0.4);
  else if (option === 8) objects(210, 0, 480, 0);
}

// 各場合毎の音波オブジェクトを格納
function waveListStore() {

  function moveWaveStore(add_value, def_value) {
    for (var i = 0; i < phenom_cvs.width; i += add_value) {
      waveList.push(new Wave(def_value + i));
    }
  }

  function stopWaveStore(add_value, def_value) {
    for (var i = 0; i < phenom_cvs.width / 35; i += add_value) {
      waveList.push(new Wave(def_value));
    }
  }

  if (option === 1) moveWaveStore(35, 70);
  else if (option === 3) stopWaveStore(1, 425);
  else if (option === 5) moveWaveStore(35, 70);
  else if (option === 6) moveWaveStore(23.33, 186.64);
  else if (option === 7) moveWaveStore(23.33, 186.64);
  else if (option === 8) stopWaveStore(1, 250);
}

// アニメーションの描画
function loop() {
  phenom_ctx.clearRect(0, 0, phenom_cvs.width, phenom_cvs.height);

  objectsRender();

  if (option === 1) {
    observerStop();
  } else if (option === 3) {
    sourceStop();
  } else if (option === 5 || option === 6 || option === 7) {
    cross();
  } else if (option === 8) {
    stop();
  }

  phenom_ctx.save();
  callbackId = window.requestAnimationFrame(loop);
}

// ①の描画
function observerStop() {
  source.update();
  waveList.forEach((wave) => wave.update(source.x));
  waveList.forEach((wave) => wave.render(phenom_ctx));
}

// ③の描画
function sourceStop() {
  observer.update();
  for (var i = 0; i < phenom_cvs.width / 35; i++) {
    if (observer.x >= 10 + (35 * i)) {
      waveList[i].radius++;
    }
  }
  waveList.forEach((wave) => wave.render(phenom_ctx));
}

// ⑤⑥の描画
function cross() {
  observer.update();
  observerStop();
}

// ⑧の描画
function stop() {
  hiddenObj.update();
  // hiddenObj.render(phenom_ctx);
  for (var i = 0; i < phenom_cvs.width / 35; i++) {
    if (hiddenObj.x >= (35 * i)) {
      waveList[i].radius++;
    }
  }
  waveList.forEach((wave) => wave.render(phenom_ctx));
}
