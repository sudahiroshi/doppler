function onStartButtonClick() {
  if (flag == false) {
    flag = true;
  }
  var generatorfrequency = parseFloat(document.getElementById('generator_frequency').value);
  var generatorVelocity = parseFloat(document.getElementById('generator_velocity').value);
  var observerVelocity = parseFloat(document.getElementById('observer_velocity').value);

  var cvs = document.getElementById('cv');
  var ctx = cvs.getContext('2d');

  generator = new Generator(135, generatorVelocity);
  observer = new Observer(400, observerVelocity);

  var rightWaveList = [];
  var leftWaveList = [];
  var wave_x = [];

  for (var i = 0; i < 1000; i += (30 / generatorfrequency)) {
    rightWaveList.push(new RightWave(150 + i * generatorVelocity, 2));
    leftWaveList.push(new LeftWave(150 + i * generatorVelocity, 2));
    wave_x.push(150 + i * generatorVelocity);
  }

  // アニメーションの描画
  (function loop() {
    if (flag == false) {
      return false;
    }
    ctx.clearRect(0, 0, 1000, 500);

    generator.update();
    generator.render(ctx);

    observer.update();
    observer.render(ctx);

    for (var i = 0; i < 500; i++) {
      if (generator.x >= wave_x[i]) {
        rightWaveList[i].update();
        rightWaveList[i].render(ctx);
        leftWaveList[i].update();
        leftWaveList[i].render(ctx);
      }
    }
    window.requestAnimationFrame(loop);
  }());
}
