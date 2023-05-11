let activ = 0;
let lastcordx = 0;
let lastcordy = 0;
let options = false;
let klik = 0;
let opcje_png;

function setup() {
  createCanvas(700, 550);
  grawitacja = new slider({x1:20 ,x2:110 ,y:70 ,maxval:5 ,round:1,bgcol:"#969696" ,btncol:"#545454",nazwa: "Grawitacja:",val: 1});
  oporpowietrza = new slider({x1:20 ,x2:110 ,y:110 ,maxval:1 ,round:1,bgcol:"#969696" ,btncol:"#545454",nazwa: "Opor Powietrza:",val: 0.3});
  odbijanie = new slider({x1:20 ,x2:110 ,y:150 ,maxval:1 ,round:1,bgcol:"#969696" ,btncol:"#545454",nazwa: "Odbijanie:",val: 0.6});
  kolor = new slider({x1:20 ,x2:110 ,y:230 ,maxval:359 ,round:0,bgcol:"#969696" ,btncol:"#545454",nazwa: "Kolor:",val: 100});
  wielkosc = new slider({x1:20 ,x2:110 ,y:190 ,maxval:80 ,round:0,bgcol:"#969696" ,btncol:"#545454",nazwa: "Srednica:",val: 40});
  kula = new ball({rad: 50,x: width/2,y: 50});
  opcje_png = loadImage("setting.png");
}



class slider{
  
  constructor(config){
    this.x1 = config.x1;
    this.x2 = config.x2;
    this.y = config.y;
    this.maxvalue = config.maxval;
    this.round = config.round;
    this.bgcolor = config.bgcol;
    this.buttoncolor = config.btncol;
    this.value = config.val || 0;
    this.buttonposition = (this.x2-this.x1) * (this.value/this.maxvalue);
    this.nazwa = config.nazwa || "slider";
    
  }
  
  display() {
    strokeWeight(1);
    stroke("black");
    fill(this.bgcolor);
    rect(this.x1,this.y-4,this.x2-this.x1,8);
    strokeWeight(2);
    fill(this.buttoncolor);
    circle(this.x1+this.buttonposition,this.y,15);
    if(mouseIsPressed && this.x1-10 < mouseX && this.x2+10 > mouseX && this.y-10 < mouseY && this.y+10 > mouseY){
      this.buttonposition = mouseX-this.x1;
      if(mouseX<this.x1){
        this.buttonposition = 0;
      }
      if(mouseX>this.x2){
        this.buttonposition = this.x2-this.x1;
      }
      this.value = round(this.maxvalue * (this.buttonposition / (this.x2-this.x1)),this.round);
    }
    textAlign(LEFT,CENTER);
    textSize(17);
    fill(255);
    strokeWeight(3);
    stroke(0);
    text(this.nazwa,this.x1-5,this.y-17);
    textSize(10);
    text(this.value,this.x2+12,this.y);
  }
}



class ball{
  
  constructor(config){
    this.color = "hsl("+kolor.value+",100%,50%)";
    this.radius = wielkosc.value;
    this.x = config.x;
    this.y = config.y;
    this.spedy = 0;
    this.spedx = 0;
  }
  
  calculate(){
    
    if(this.spedy<0){
      this.spedy -= -grawitacja.value - grawitacja.value * (wielkosc.value/40) - (round(oporpowietrza.value,2) * (wielkosc.value/50) - this.spedy / 10) * (oporpowietrza.value * oporpowietrza.value);
    }else if(this.spedy>=0){
      this.spedy += grawitacja.value + grawitacja.value * (wielkosc.value/40) - (round(oporpowietrza.value/2,2) * (wielkosc.value/50) + this.spedy / 10) * (oporpowietrza.value * oporpowietrza.value);
    }
    
    if(this.spedx<0){
      this.spedx += (round(oporpowietrza.value/2,2) - this.spedx / 10) * (oporpowietrza.value * oporpowietrza.value);
    }else if(this.spedx>0){
      this.spedx -= (round(oporpowietrza.value/2,2) + this.spedx / 10) * (oporpowietrza.value * oporpowietrza.value);
    }
    if(round(this.spedx) == 0){
      this.spedx = 0;
    }
    
    this.y += this.spedy;
    this.x += this.spedx;
    if(this.y>height-this.radius/2){
      this.y = height-this.radius/2;
      this.spedy = this.spedy * -odbijanie.value;
      if(oporpowietrza.value * oporpowietrza.value == 1){
      this.spedx = this.spedx / (3-odbijanie.value);
      }else{
      this.spedx = this.spedx / ((3-odbijanie.value)/2);
      }
    }
    if(this.x>width-this.radius/2){
      this.x = width-this.radius/2;
      this.spedx = this.spedx * (odbijanie.value/-2);
    }
    if(this.x<this.radius/2){
      this.x = this.radius/2;
      this.spedx = this.spedx * -(odbijanie.value/2);
    }
  }
  
  display(){
    
    this.radius = wielkosc.value;
    this.calculate();
    
    stroke(0);
    strokeWeight(5);
    this.color = "hsl("+kolor.value+",100%,50%)";
    fill(this.color);
    circle(this.x,this.y,this.radius)
    
    if(mouseIsPressed){
      lastcordx = this.x;
      lastcordy = this.y;
      if(dist(mouseX,mouseY,this.x,this.y)<this.radius/2){
        activ = 1;
      }
      
    }else{
      if(activ == 1){
        this.spedx = (this.x - lastcordx)/2;
        this.spedy = (this.y - lastcordy)/2;
      }
      activ = 0;
    }
    if(activ == 1){
      this.x = mouseX;
      this.y = mouseY;
      this.spedy = 0;
      this.spedx = 0;
    }
    
  }
  
}



function draw() {
  background(220);
  kula.display();
  if(options){
    grawitacja.display();
    odbijanie.display();
    oporpowietrza.display();
    wielkosc.display();
    kolor.display();
    image(opcje_png,10,10,30,30);
    if(mouseIsPressed){
      if(klik == 0 && dist(25,25,mouseX,mouseY)<15){
        options = false;
      }
      klik = 1;
    }else{
      klik = 0;
    }
  }else{
    image(opcje_png,10,10,30,30);
    if(mouseIsPressed){
      if(klik == 0 && dist(25,25,mouseX,mouseY)<15){
        options = true;
      }
      klik = 1;
    }else{
      klik = 0;
    }
  }
}