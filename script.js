var img;
var pontos;
var c1;
var density = 15; //px por ponto
var tx, ty;
var slider;

function preload(){
  img = loadImage("girassol.jpg");
}
function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
  
  slider = createSlider(0, 2, 0.5, 0);
  slider.position(620, 10);
  
  pontos = [];
  for(var i = 0; i < height/density; i++){
    for(var j = 0; j < width/density; j++){
      tx = density*j;
      ty = density*i;
      c1 = get(tx, ty);
      pontos.push(new Ponto(tx, ty, c1));
    }
  }
  for(var i = 0; i< pontos.length; i++){
    pontos[i].grey();
  }
}

function draw() {
  background(2);
  for(var i = 0; i < pontos.length; i++){
    var v = slider.value();
    pontos[i].update(frameCount, v);
    pontos[i].render();
  }
}

function Ponto(x, y, c1){
  this.x = x;
  this.y = y;
  this.c1 = c1;
  this.fi = random(0, TWO_PI);
  this.gry = 0;
  
  this.clr = this.c1;
  
  this.grey = function (){
    this.gry= floor((red(this.c1) + green(this.c1) + blue(this.c1))/3);
  }
 
 this.update = function (t, v){
   var r, g, b, wt;
   wt = v*t
   
   
   r = 0.6*(red(this.c1) + this.gry) + 0.3*(red(this.c1) - this.gry)*cos(wt + this.fi);
   g = 0.6*(green(this.c1) + this.gry) + 0.3*(green(this.c1) - this.gry)*cos(wt + this.fi);
   b = 0.6*(blue(this.c1) + this.gry) + 0.3*(blue(this.c1) - this.gry)*cos(wt + this.fi);
   
   this.clr = color(r, g, b, 255);
 }
  
  this.render = function(){
    noStroke();
    fill(red(this.clr), green(this.clr), blue(this.clr));
    ellipse(this.x, this.y, 0.9*density, 0.9*density);
  }
}
