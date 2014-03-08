/*
  @author: Marlon
  LICENSCE BY MIT
*/

var colors = new Array ("black", "red", "blue", "yellow", "green", "orange", "brown");
var canvas = document.getElementById('myCanvas');

var context = canvas.getContext('2d');
var xBef=0, yBef=0, color="black";
var clicking = false, flag=true, er=false;
var originalCursor = window.getComputedStyle(myCanvas).getPropertyValue('cursor');
var SIZE_FACTOR = 0.98;
canvasDiv = document.getElementById('canvasDiv');
var canvasDivCStyle = window.getComputedStyle(canvasDiv,null);

canvas.width = parseInt(canvasDivCStyle.getPropertyValue('width'))*SIZE_FACTOR;
canvas.height = parseInt(canvasDivCStyle.getPropertyValue('height'))*SIZE_FACTOR;


window.onresize = function(){
  canvas.width = parseInt(canvasDivCStyle.getPropertyValue('width'))*SIZE_FACTOR;
  canvas.height = parseInt(canvasDivCStyle.getPropertyValue('height'))*SIZE_FACTOR;
}

/*Fill all canvas box as white color*/
context.beginPath();
context.rect(-5,-5,canvas.width+5, canvas.height+5);
context.fillStyle = 'white'; 
context.fill();
context.closePath();

function getMousePos(evt) {
   var rect = canvas.getBoundingClientRect();
    a = evt.clientX - rect.left;
    b = evt.clientY - rect.top;
   return {
      x: a,
      y: b
   };
}

function draw(evt){
  var mousePos = getMousePos(evt);
  x = mousePos.x;
  y = mousePos.y;          
  if(flag){
    xBef = x-1;
    yBef = y-1;
  }
  context.beginPath();
  context.moveTo(xBef, yBef);
  
  //writeMessage(canvas, 'xbef:' + xBef +' ybef:' + yBef); //To Debug

  context.lineTo(x, y);
  context.lineWidth=2;
  context.strokeStyle=colors[color];
  context.stroke();
  context.closePath();
  xBef = x;
  yBef = y;
}


/*  Use to debug \/ 
function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '10pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
}*/ 


function enableErase(){ er=true; }

function erase(evt) {
  mousePos = getMousePos(evt);
  x = mousePos.x;
  y = mousePos.y;
  context.beginPath();
  context.rect(x,y,16,20);  
  context.lineWidth=1;
  context.strokeStyle= 'white';
  context.fillStyle = 'white';
  context.stroke();
  context.fill();
  context.closePath();
}

canvas.onmouseup = function(){ clicking = false; }
canvas.onmouseout = function(){ clicking = false;}
canvas.onmousemove = function(evt){
  if(clicking){  
    if(er) erase(evt);
    else draw(evt);
  }
  flag=false;
}
canvas.onmousedown = function(evt){
  flag = true;
  clicking = true;
  canvas.onmousemove(evt);
}

function pencil(colorId){
  color = colorId;
  myCanvas.style.cursor = 'url(img/cursor_'+colorId+'.cur),auto';
  er=false;
}


document.getElementById('saveImg').onclick = function(){
  var dataURL =  canvas.toDataURL();
  document.getElementById('canvasImg').src = dataURL;
  document.getElementById('imgDownload').href = document.getElementById('canvasImg').src;
}

document.getElementById('clear').onclick = function() {
	context.beginPath();
	context.rect(-5,-5,canvas.width+5, canvas.height+5);
	context.fillStyle = 'white'; 
	context.fill();
	context.closePath();
}
document.getElementById('erase').onclick = function() {
  er = true;
  myCanvas.style.cursor = 'url(img/borracha.cur), auto';
}