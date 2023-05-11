let start,oile,ex,ey,mx,my;
let activ = 0;
let mmm = true;
let drawlist = [];
let physicspheres = [[40,50,300,"lightgray"],[75,500,100,"lightgray"],[120,300,500,"lightgray"]];
function setup() {
  createCanvas(600, 600);
  kat = new slider({x1:20 ,x2:110 ,y:40 ,maxval:360 ,round:0,bgcol:"#969696" ,btncol:"#545454",nazwa: "Kąt:",val: 45});
  fov = new slider({x1:20 ,x2:110 ,y:80 ,maxval:360 ,round:0,bgcol:"#969696" ,btncol:"#545454",nazwa: "Pole Widzenia:",val: 90});
  jakosc = new slider({x1:20 ,x2:110 ,y:120 ,maxval:1500 ,round:0,bgcol:"#969696" ,btncol:"#545454",nazwa: "Ilość promieni:",val: 100});
  slace = new slonce({radius: 50});
  raycast = new raycasting();
}

class slonce{
  
  constructor(info){
    
    this.x = width/2;
    this.y = height/2-100;
    this.radius = info.radius;
    this.strenght = 10;
    this.angle = kat.value;
    this.fov = fov.value;
    this.quality = jakosc.value;
    
  }
  
  displayrays(){
    for(let x in drawlist){
      if(drawlist[x][1] > width){
        drawlist[x][1] = width;
      }
      if(drawlist[x][1] < 0){
        drawlist[x][1] = 0;
      }
      if(drawlist[x][0] > height){
        drawlist[x][0] = height;
      }
      if(drawlist[x][0] < 0){
        drawlist[x][0] = 0;
      }
      stroke("rgba(255,255,0,0."+(100 - round(dist(this.x,this.y,drawlist[x][0],drawlist[x][1]) / this.strenght))+")");
      if(drawlist[x-1] !== undefined && drawlist[x][2] == true && drawlist[x-1][2] == true){
          line(drawlist[x-1][0],drawlist[x-1][1],drawlist[x][0],drawlist[x][1]);
      }
      if(drawlist[x][2] == false && drawlist[x-1] !== undefined && drawlist[x-1][2] == false && dist(drawlist[x-1][0],drawlist[x-1][1],drawlist[x][0],drawlist[x][1]) <100){
          line(drawlist[x-1][0],drawlist[x-1][1],drawlist[x][0],drawlist[x][1]);  
      }
      if(drawlist[x-1] !== undefined && (drawlist[x][2] !== drawlist[x-1][2] || dist(drawlist[x-1][0],drawlist[x-1][1],drawlist[x][0],drawlist[x][1]) >= 100)){
        stroke("rgba(255,255,0,0.10)");
        line(drawlist[x][0],drawlist[x][1],drawlist[x-1][0],drawlist[x-1][1]);  
      }
      if(x == 0 || x == drawlist.length-1){
        if(x == drawlist.length-1 && fov.value == 360 && drawlist[drawlist.length-1][2] == drawlist[0][2]){
        line(drawlist[x][0],drawlist[x][1],drawlist[0][0],drawlist[0][1]); 
        }else if(x == drawlist.length-1 && fov.value == 360){
          stroke("rgba(255,255,0,0.10)");
          line(drawlist[x][0],drawlist[x][1],drawlist[0][0],drawlist[0][1]);  
        }
        if(fov.value !== 360){
          stroke("rgba(255,255,0,0.10)");
          line(drawlist[x][0],drawlist[x][1],slace.x,slace.y);
        }
      }
      textSize(20);
      fill(0)
    }
    drawlist = [];
  }
  
  rays(){
    push();
    start = this.angle - this.fov/2;
    translate(this.x,this.y);
    angleMode(DEGREES);
    oile = this.fov/this.quality;
    stroke(0)
    rotate(start);
    for(let xe=0;xe<this.quality;xe++){
    rotate(oile);
    raycast.raycast(oile * (xe+1));
    }
    pop();
    this.displayrays();
  }
  
  display(){
    
    this.angle = kat.value;
    this.fov = fov.value;
    this.quality = jakosc.value;
    this.rays();
    noStroke();
    fill("yellow");
    circle(this.x,this.y,this.radius);
    if(mouseIsPressed){
      if(activ == 0 && dist(mouseX,mouseY,this.x,this.y) < this.radius){
      activ = 1;
      }
    }else{
      activ = 0;
    }
    if(activ == 1){
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  
}


class raycasting{
  
  constructor(){
    
    this.x = 0;
    this.y = 0;
    this.epe = 0;
    
  }
  
  angles(pos,angl,off){
    if(angl>360){
      angl=angl-360;
    }
    if(angl>=0 && angl <=90){
      ex = slace.x + (pos-off) * sin(angl);
      ey = slace.y - (pos+off) * sin(90-angl);
    }
    if(angl>90 && angl <=180){
      angl-=90;
      ex = slace.x + (pos-off) * sin(90-angl);
      ey = slace.y + (pos-off) * sin(angl);
    }
    if(angl>180 && angl <=270){
      angl-=180;
      ex = slace.x - (pos+off) * sin(angl);
      ey = slace.y + (pos-off) * sin(90-angl);
    }
    if(angl>270){
      angl-=270;
      ex = slace.x - (pos+off) * sin(90-angl);
      ey = slace.y - (pos+off) * sin(angl);
    }
  }
  
  checkBorder(pos,angl){
    angl += slace.angle;
    this.angles(pos,angl,0);
    if(ex<=1 || ex>=width || ey<=1 || ey>=height){
      mmm = true;
      mx = ex;
      my = ey;
      this.angles(pos,angl,0.5);
      if(!(ex<=1 || ex>=width || ey<=1 || ey>=height)){
        ex = ex;
        ey = my;
      }
      mx = ex;
      my = ey;
      this.angles(pos,angl,0.5);
      if(!(ex<=1 || ex>=width || ey<=1 || ey>=height)){
        ex = ex;
        ey = my;
      }
      mx = ex;
      my = ey;
      this.angles(pos,angl,0.5);
      if(!(ex<=1 || ex>=width || ey<=1 || ey>=height)){
        ex = ex;
        ey = my;
      }
      this.epe = ey;
      return 1;
    }else{
      for(let x1 of physicspheres){
        if( dist(ex,ey,x1[1],x1[2]) <x1[0]/2){
          mx = ex;
          my = ey;
          this.angles(pos,angl,0.3);
          if(dist(ex,ey,x1[1],x1[2]) > x1[0]/2){
            ex = ex;
            ey = my;
          }
          mx = ex;
          my = ey;
          this.angles(pos,angl,0.3);
          if(dist(ex,ey,x1[1],x1[2]) > x1[0]/2){
            ex = ex;
            ey = my;
          }
          this.epe = ey;
          mmm = false;
          return 1;
        }
      }
      if(mmm == true){
        return 0;
      }
    }
  }
  
  //this.checkSquare(posx) == 0 || 
  
  raycast(coss){
    let posx = this.x;
    mmm = true;
    while(this.checkBorder(posx,coss) == 0){
      posx=posx+2;
    }
    drawlist.push([ex,ey,mmm]);
  }
  
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

function displayobjects(){
  for(let x of physicspheres){
    fill(x[3]);
    circle(x[1],x[2],x[0])
  }
}

function draw() {
  frameRate(60);
  background(90);
  stroke("rgb(107,107,107)");
  fill("rgb(121,121,121)");
  textSize(30);
  textAlign(CENTER,CENTER)
  text("LPM porusz słońcem",width/2,height/2);
  displayobjects();
  slace.display();
  kat.display();
  fov.display();
  jakosc.display();
  textSize(20)
  fps = round(frameRate());
  text("fps: "+ fps,width-70,height-15);
  
}