// オブジェクト作成
const objects = (source_x, source_vel, observer_x, observer_vel) => {
  line = new Line();
  source = new Source(source_x, source_vel);
  observer = new Observer(observer_x, observer_vel);
  hiddenObj = new HiddenObj();
  graphLine = new GraphLine();
};

// 共通の描画
const objRender = () => {
  line.render(phenom_ctx);
  source.render(phenom_ctx);
  observer.render(phenom_ctx);
  graphLine.render(graph1_ctx);
  graphLine.render(graph2_ctx);
  graphLine.render(graph3_ctx);
};

// 各場合毎のオブジェクト定義
const objStore = () => {
  if (option === 1) objects(10, 0.6, 395, 0);
  if (option === 3) objects(385, 0, 10, 0.6);
  if (option === 5) objects(10, 0.6, 250, 0.1);
  if (option === 6) objects(130, 0.4, 10, 0.6);
  if (option === 7) objects(130, 0.4, 630, -0.4);
  if (option === 8) objects(210, 0, 480, 0);
};

// 各場合毎の音波オブジェクトを格納
const waveListStore = () => {

  const moveWaveStore = (add_value, def_value) => {
    hiddenWave = new Wave(def_value);
    for (let i = add_value; i < phenom_cvs.width; i += add_value) {
      waveList.push(new Wave(def_value + i));
    }
  };

  const stopWaveStore = (add_value, def_value) => {
    hiddenWave = new Wave(def_value);
    for (let i = 0; i < phenom_cvs.width / 36; i += add_value) {
      waveList.push(new Wave(def_value));
    }
  };

  if (option === 1) moveWaveStore(36, 72);
  if (option === 3) stopWaveStore(1, 425);
  if (option === 5) moveWaveStore(36, 72);
  if (option === 6) moveWaveStore(24, 180);
  if (option === 7) moveWaveStore(24, 180);
  if (option === 8) stopWaveStore(1, 250);
};

// 音源グラフのオブジェクト作成
const graphObjStore = () => {
  srcGraphLeft = new SrcGraph(
    waveList[0].x,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave.x - hiddenWave.radius - (waveList[0].x - waveList[0].radius)
  );

  srcGraphRight = new SrcGraph(
    waveList[0].x,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius,
    graph1_cvs.height / 2,
    hiddenWave.x + hiddenWave.radius - (waveList[0].x + waveList[0].radius)
  );
};

const obsGraphObjStore = () => {
  obsGraphLeft = new ObsGraph(
    observer.x + 30,
    waveList[0].x - waveList[0].radius,
    waveList[0].x - waveList[0].radius - (source.x - observer.x),
    graph2_cvs.height / 2
  );

  obsGraphRight = new ObsGraph(
    observer.x + 30,
    waveList[0].x + waveList[0].radius,
    waveList[0].x + waveList[0].radius - (observer.x - source.x),
    graph2_cvs.height / 2
  );
};

// ①の描画
const drawObserverStop = () => {
  source.update();
  hiddenWave.update(source.actual_x);
  waveList.forEach((waveObj) => waveObj.update(source.actual_x));
  waveList.forEach((waveObj) => waveObj.render(phenom_ctx));
};

// ③の描画
const drawSourceStop = () => {
  observer.update();
  hiddenWave.update(source.actual_x);
  waveList.forEach((waveObj, i) => waveObj.update_stop(i));
  waveList.forEach((waveObj) => waveObj.render(phenom_ctx));
};

// ⑤⑥⑦の描画
const drawCross = () => {
  observer.update();
  drawObserverStop();
};

// ⑧の描画
const drawStop = () => {
  hiddenObj.update();
  hiddenWave.update(source.actual_x);
  waveList.forEach((waveObj, i) => waveObj.update_stop(i));
  waveList.forEach((waveObj) => waveObj.render(phenom_ctx));
};

// 音源の振動グラフの描画
const drawSrcGraph = () => {
  srcGraphLeft.update();
  srcGraphRight.update();
  srcGraphLeft.render(graph1_ctx);
  srcGraphRight.render(graph1_ctx);
  srcGraphLeft.render(graph3_ctx);
  srcGraphRight.render(graph3_ctx);
};

const drawObsGraph = () => {
  obsGraphLeft.update();
  obsGraphRight.update();
  obsGraphLeft.render(graph2_ctx);
  obsGraphRight.render(graph2_ctx);
  obsGraphLeft.render(graph3_ctx);
  obsGraphRight.render(graph3_ctx);
};

// アニメーションの描画
const loop = (timeStamp) => {
  nowTime = timeStamp;
  time = (nowTime - lastTime) / 1000;
  lastTime = nowTime;

  phenom_ctx.clearRect(0, 0, phenom_cvs.width, phenom_cvs.height);
  graph1_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);
  graph2_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);
  graph3_ctx.clearRect(0, 0, graph1_cvs.width, graph1_cvs.height);

  if (option === 1) drawObserverStop();
  if (option === 3) drawSourceStop();
  if (option === 5 || option === 6 || option === 7) drawCross();
  if (option === 8) drawStop();

  graphObjStore();
  obsGraphObjStore();

  objRender();
  drawSrcGraph();
  drawObsGraph();

  callbackId = window.requestAnimationFrame(loop);

  if (source.actual_x >= phenom_cvs.width || observer.x >= phenom_cvs.width || waveList[waveList.length - 1].radius > 0) {
    onResetButtonClick();
  }
};
