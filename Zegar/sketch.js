let godzina;
let minuta;
let sekunda;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  textSize(20)
  
  sekundowa = loadImage("minuta.png");
  minutowa = loadImage("sekunda.png");
  godzinowa = loadImage("godzinowa.png")
  nutan = loadImage("natrix.jpeg")
  bg1 = loadImage("wtc.jpg")
  bg2 = loadImage("911.png")
}

function draw() {
  godzina = hour();
  minuta = minute();
  sekunda = second();
  background(bg1);
  if(godzina == 23 && minuta == 59 && sekunda > 50){
    background(nutan);
  }else if(godzina == 9 && minuta == 11){
    background(bg2);
  }
  drawingContext.shadowColor = '#FFFFFF';
  drawingContext.shadowBlur = 10;
  fill('#40404070')
  circle(200,200,300);
  drawingContext.shadowColor = '#000000';
  fill(0)
  circle(200,200,20);
  drawingContext.shadowColor = '#FFFFFF';
  push();
  translate(200,200)
  textAlign(CENTER)
  fill(255)
  stroke(255)
  for(x=1;x<13;x++){
  strokeWeight(1)
  for(x2=0;x2<5;x2++){
    rotate(6);
    if(x2 !== 4){
      line(0,-139,0,-133)
    }
  }
  strokeWeight(0)
  text(x,0,-130)
  }
  pop();
  
  drawingContext.shadowBlur = 0;
  
  text("Smieszne rzeczy o 09:11:00 i 23:59:59",5,20)
  
  push();
  translate(200,200)
  rotate(((godzina * 60 * 60 + minuta * 60 + sekunda) / 86400) * 720);
  strokeWeight(5)
  image(godzinowa,-35,-60,70,70)
  pop();
  
  push();
  translate(200,200)
  rotate(((minuta * 60 + sekunda) / 3600) * 360);
  image(minutowa,-10,-100,20,100)
  pop();
  
  push();
  translate(200,200)
  rotate(sekunda*6);
  image(sekundowa,-10,-140,20,140)
  pop();
}