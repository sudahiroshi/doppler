var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

var wave_vel = 0;

function draw() {
  var r = cvs.height / 2;
  var T = cvs.width;

  function drawWave() {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(40, r - r * Math.cos((2 * Math.PI / T) * wave_vel));
    console.log(Math.cos((2 * Math.PI / T) * wave_vel));
    for (var x = 0; x <= cvs.width; x++) {
      var y = r * Math.cos((2 * Math.PI / T) * (wave_vel - x));
      ctx.lineTo(40 + x, r - y);
    }

    ctx.stroke();
  }

  function loop() {

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    drawWave();

    wave_vel++;
    window.requestAnimationFrame(loop);
  }
  loop();
}

draw();
