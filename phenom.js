var cvs = document.getElementById("phenom_cv");
var ctx = cvs.getContext("2d");

ctx.beginPath();
ctx.moveTo(0, 125);
ctx.lineTo(850, 125);
ctx.stroke();

var img = [];

img[0] = new Image();
img[0].src = "soundsource.svg";

img[1] = new Image();
img[1].src = "observer.svg";


img[0].onload = function() {
  ctx.drawImage(img[0], 90, 75, 15, 45);
}

img[1].onload = function() {
  ctx.drawImage(img[1], 200, 65, 25, 60);
}
