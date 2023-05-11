let pola = [0,0,0,0,0,0,0,0,0]

let tura = 1;
let win = null;
let klik = true;
let rundy = 0;

function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(220);
  if(rundy == 9){
    win = "nikt";
  }
  if(win == null){
    
    stroke(0);
    strokeWeight(5)
    line(100,10,100,290)
    line(200,10,200,290)
    line(10,100,290,100)
    line(10,200,290,200)
    c = 0;
    r = 0;
    for(let x in pola){
      textAlign(CENTER,CENTER)
      textSize(70);
      if(klik && mouseIsPressed && mouseX>c*100 && mouseX<c*100+100 && mouseY>r*100 && mouseY<r*100+100 && pola[x] == 0){
        rundy++;
        if(tura == 1){
          tura = 2;
          pola[x] = "o";
        }else{
          tura = 1;
          pola[x] = "x";
        }
        sprawdz();
      }
      if(pola[x]  == 'x' || pola[x]  == "o"){
        text(pola[x] , c*100+50, r*100+50);
      }
      c++;
      if(c == 3){
        c = 0;
        r++;
      }
    }
    
    if(!mouseIsPressed){
      klik = true;
    }else{
      klik = false;
    }
    
    textAlign(CENTER,CENTER)
    textSize(20);
    strokeWeight(1);
    if(tura == 1){
      text("ruch: o",width/2,14)
    }else{
      text("ruch: x",width/2,14)
    }
    
  }else{
    textAlign(CENTER,CENTER)
    textSize(40);
    strokeWeight(2);
    text("wygrywa: "+win,width/2,height/2)
  }
}

function sprawdz(){
  
  if(pola[0] !== 0 && pola[0] == pola[3] && pola[3] == pola[6]){
    win = pola[0];
  }
  if(pola[1] !== 0 && pola[1] == pola[4] && pola[4] == pola[7]){
    win = pola[1];
  }
  if(pola[2] !== 0 && pola[2] == pola[5] && pola[5] == pola[8]){
    win = pola[2];
  }
  if(pola[0] !== 0 && pola[0] == pola[1] && pola[1] == pola[2]){
    win = pola[0];
  }
  if(pola[3] !== 0 && pola[3] == pola[4] && pola[4] == pola[5]){
    win = pola[3];
  }
  if(pola[6] !== 0 && pola[6] == pola[7] && pola[7] == pola[8]){
    win = pola[6];
  }
  if(pola[0] !== 0 && pola[0] == pola[4] && pola[4] == pola[8]){
    win = pola[0];
  }
  if(pola[2] !== 0 && pola[2] == pola[4] && pola[4] == pola[6]){
    win = pola[2];
  }
}