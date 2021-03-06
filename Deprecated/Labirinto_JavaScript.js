new p5();
//==========================================
var n = 40;
var m = 40;
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
var mic;
var micDelay = 0;
//===========================================
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
    mic = new p5.AudioIn()
    mic.start();

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
	if (keyCode === LEFT_ARROW){
		var ii = p1;
		var jj = p2-1;
		 if (ii>=0 && ii < n && jj >= 0 && jj<m && lab[ii][jj]==false){
		 	p2 = p2-2;
		 	cx = cx - (tp+tc);
		 	counter +=1;
		 	venceu();
		 }
	}
	if (keyCode === UP_ARROW){
		var ii = p1-1;
		var jj = p2;
		 if (ii>=0 && ii < n && jj >= 0 && jj<m && lab[ii][jj]==false){
		 	p1 = p1-2;
		 	cy = cy - (tp+tc);
		 	counter +=1;
		 	venceu();
		 }
	}
	if (keyCode === RIGHT_ARROW){
		var ii = p1;
		var jj = p2+1;
		 if (ii>=0 &&  ii < n &&  jj >= 0 &&  jj<m && lab[ii][jj]==false){
		 	p2 = p2+2;
		 	cx = cx + (tp+tc);
		 	counter +=1;
		 	venceu();
		 }
	}
	if (keyCode === DOWN_ARROW){
		var ii = p1+1;
		var jj = p2;
		 if  (ii>=0 &&  ii < n &&  jj >= 0 &&  jj<m && lab[ii][jj]==false){
		 	p1 = p1+2;
		 	cy = cy + (tp+tc);
		 	counter +=1;
		 	venceu();
		 }
	}
}


//=============================================

function arrow(){
	strokeWeight(1);
	stroke(0);

	fill(100,100,220);
	//left arrow
	if (count<tsec && path[0]==true){
	   triangle(cx-15, cy+8, cx-15, cy-8, cx-30, cy);
     dir = 0;
	}
  else if(count<tsec && path[0]==false){
    count = tsec;
    dir = 4;
  }

	//up arrow
	if (count>=tsec && count<2*tsec && path[1]==true){
	   triangle(cx+8, cy-15, cx-8, cy-15, cx, cy-30);
     dir = 1;
	}
  else if(count>=tsec && count<2*tsec && path[1]==false){
    count = 2*tsec;
    dir = 4;
  }

	//right arrow
	if (count>=2*tsec && count<3*tsec && path[2]==true){
	   triangle(cx+15, cy+8, cx+15, cy-8, cx+30, cy);
     dir = 2;
	}
  else if(count>=2*tsec && count<3*tsec && path[2]==false){
    count = 3*tsec;
    dir = 4;
  }

	//down arrow
	if (count>=3*tsec && count<4*tsec && path[3]==true){
	   triangle(cx+8, cy+15, cx-8, cy+15, cx, cy+30);
     dir = 3;
	}
  else if(count>=3*tsec && count<4*tsec && path[3]===false){
    count = 4*tsec-1;
    dir = 4;
  }

	count ++;
	if (count==4*tsec) count = 0;


	fill(150,150,150);
	noStroke();

}


function walk(){

  if (micDelay==0) var micLevel = mic.getLevel();


  if (micLevel > 0.1 && dir!=4){
    if (dir==0){
      count = 0;
      p2 = p2-2;
      cx = cx - (tp+tc);} //left

    if (dir==1){
      count = tsec;
      p1 = p1-2;
      cy = cy - (tp+tc);} //up

    if (dir==2){
      count = 2*tsec;
      p2 = p2+2;
      cx = cx + (tp+tc);} //right

    if (dir==3){ 
      p1 = p1+2;
      count = 3*tsec;
      cy = cy + (tp+tc);} //down
  }
  dir = 4;
  if (micDelay<1) micDelay++;
  else micDelay = 0;
}

function verify(){
  //left
  if (p1>=0 && p1<n && (p2-1)>=0 && (p2-1)<m && lab[p1][p2-1]==false){
    path[0]=true;
    // dir = 0;
  }
  else path[0]=false;

  //up
  if ((p1-1)>=0 && (p1-1)<n && p2>=0 && p2<m && lab[p1-1][p2]==false){
    path[1]=true;
    // dir = 1;
  }
  else path[1]=false;

  //right
  if (p1>=0 && p1<n && (p2+1)>= 0 && (p2+1)<m && lab[p1][p2+1]==false){
    path[2]=true;
    // dir = 2;
  }
  else path[2]=false;

  //down
  if  ((p1+1)>=0 &&  (p1+1)<n &&  p2>= 0 &&  p2<m && lab[p1+1][p2]==false){
    path[3]=true;
    // dir = 3;
  }
  else path[3]=false;
}

function draw() {
  background(200)
  verify();

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

  arrow();
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
  walk();
}