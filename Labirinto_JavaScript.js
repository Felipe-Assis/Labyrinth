// new p5();
//==========================================
var n = 46;
var m = 76;
var tp = 2;
var tc = 24;
var p1 = randInt(0, n-1);
var p2 = randInt(0, m-1);
var r1 = randInt(0, n-1);
var r2 = randInt(0, m-1);
var larg = Math.floor(m/2*tc + (m/2+1)*tp)
var alt = Math.floor((n/2*tc + (n/2+1)*tp))
var lab = [];
var vencedor = false;
var counter = 0;
var left, right, up, down;
var count = 0;
var traveling = false;
var path = [false,false,false,false]; //[LEFT, UP, RIGHT, DOWN]
var dir = 4; //0=LEFT; 1=UP; 2=RIGHT; 3=DOWN; 4=IDLE;
var tsec = 60; //time until arrow changes direction
// var mic;
// var micDelay = 0;
//===========================================
//==========Speach Recognition===============
var myVoice = new p5.Speech(); // new P5.Speech object
var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)



for (var i=0; i<n; i++){
  lab.push([]);
   for (var j=0; j<m; j++){
    lab[i].push(i%2==0 || j%2==0);
      }
    }
lab2 = lab;
counter = 0;
vendecor = false;
// console.log(lab);

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//=============================================
function visita(i, j){
  possiveis=[[i-2,j],[i+2,j],[i,j+2],[i,j-2]];
  lab[i][j]=true;

  shuffle(possiveis,true)

  possiveis.forEach(function(entry){
  	var ii = entry[0];
  	var jj = entry[1];

    if ((ii>=0) && (ii<n) && (jj<m) && (lab[ii][jj]==false)){
      if (ii!=i) lab[Math.floor((i+ii)/2)][j] = false;
      else lab[i][Math.floor((j+jj)	/2)] = false;
      visita(ii,jj);}
  });
}
//=============================================
function chegada(l){
  if (r1%2!=0 && r2%2!=0){
    if (lab[r1][r2] == false){
    	if (lab[r1][r2]==false) lab[r1][r2] = 0;}
  }
  else{
    r1 = randInt(0,n-1);
    r2 = randInt(0,m-1);
    chegada(l);
  }
}
//=============================================
function partida(l){
  if (p1%2!=0 && p2%2!=0){
    if (lab[p1][p2] == false){
      return
    }
  }
  else{
    p1 = randInt(0,n-1);
    p2 = randInt(0,m-1);
    partida(l);
  }
}
//=============================================
function venceu(){
  if (p1==r1 && p2==r2){
    vencedor = true;
  }
}
//=============================================

  
function setup() {
    // instructions:
    myVoice.speak('Bem vindo ao labirinto. Diga left, right, up ou down para se mover.');

    //myRec.onResult = parseResult; // now in the constructor
    myRec.start(); // start engine


    // mic = new p5.AudioIn()
    // mic.start();

    noStroke();
    larg=Math.floor(m/2*tc+(m/2+1)*tp);
    alt=Math.floor(n/2*tc+(n/2+1)*tp);
    createCanvas(larg,alt);
    chegada(lab);
    partida(lab2);
    cx = Math.floor((tp+tc/2)+(tp+tc)*(p2-1)/2);
    cy = Math.floor((tp+tc/2)+(tp+tc)*(p1-1)/2);
    visita(1,1);

    for (var i=0; i<n; i++){
      for (var j=0; j<m; j++){
        if (i%2!=0 && j%2!=0) lab[i][j] = false;
      }
    }
 }

//=============================================

function keyPressed(){
	if (keyCode === LEFT_ARROW) moveLeft();
	if (keyCode === UP_ARROW) moveUp();
	if (keyCode === RIGHT_ARROW) moveRight();
	if (keyCode === DOWN_ARROW) moveDown();
}

function draw() {
  background(200);

  for (var i=0; i<n; i++){
    if (i%2 == 0){
      alt = tp;
      y = Math.floor(i/2)*tp + Math.floor(i/2)*tc;
    }
    else{
      alt = tc;
      y= (Math.floor(i/2+1)*tp) + (Math.floor(i/2)*tc);
    }
    for (var j=0; j<m; j++){
      if (j%2==0){
        larg = tp;
        x = Math.floor(j/2)*tp + Math.floor(j/2)*tc;
      }
      else{
        larg = tc;
        x = (Math.floor(j/2)+1)*tp + Math.floor(j/2)*tc;
      }
      if (lab[i][j]==true){
        fill(0,0,0);
      }
      else{
        fill(255,255,255);
      }
      rect(x, y, larg, alt);
    }
  }

  textSize(20);
  textAlign(LEFT);
  fill(255,69,0);
  text("Move: left, right, up, down", 20, 20);
  strokeWeight(1);
  stroke(0);
  fill(255,0,0);
  ellipse(cx, cy, 15, 15);
  fill(150,150,150);
  ellipse((tp+tc/2)+(tp+tc)*(r2-1)/2,(tp+tc/2)+(tp+tc)*(r1-1)/2,15,15) //Arrival spot coordinates
  noStroke();   
  if (vencedor==true){
  	textSize(60);
  	text("You won", width/2-180, height/2);
  }
}


function parseResult()
{
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  var mostrecentword = myRec.resultString.split(' ').pop();
  if(mostrecentword.indexOf("left")!==-1) moveLeft();

  else if(mostrecentword.indexOf("right")!==-1) moveRight();

  else if(mostrecentword.indexOf("up")!==-1) moveUp();

  else if(mostrecentword.indexOf("down")!==-1) moveDown();

  console.log(mostrecentword);
}


function moveLeft(){
  var ii = p1;
  var jj = p2-1;
   if (ii>=0 && ii < n && jj >= 0 && jj<m && lab[ii][jj]==false){
    p2 = p2-2;
    cx = cx - (tp+tc);
    counter +=1;
    venceu();
  }
}

function moveRight(){
  var ii = p1;
  var jj = p2+1;
   if (ii>=0 &&  ii < n &&  jj >= 0 &&  jj<m && lab[ii][jj]==false){
    p2 = p2+2;
    cx = cx + (tp+tc);
    counter +=1;
    venceu();
  }
}

function moveUp(){
  var ii = p1-1;
  var jj = p2;
   if (ii>=0 && ii < n && jj >= 0 && jj<m && lab[ii][jj]==false){
    p1 = p1-2;
    cy = cy - (tp+tc);
    counter +=1;
    venceu();
  }
}

function moveDown(){
  var ii = p1+1;
  var jj = p2;
   if  (ii>=0 &&  ii < n &&  jj >= 0 &&  jj<m && lab[ii][jj]==false){
    p1 = p1+2;
    cy = cy + (tp+tc);
    counter +=1;
    venceu();
  }
}