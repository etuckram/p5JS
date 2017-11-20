var speed = 6;
var cwidth = 600;
var cheight = 600;
var lines = [];
var roads = [];
var m = 0;
var n = 0;
var player;
var enemies = [];
var score = 0;
var steer = 4;
var protection = 0;
var gameOver = false; 

function setup() {
  createCanvas(cwidth, cheight);
  startCanvas();

}

function startCanvas(){
  for (i=0; i < 9; i++){
	lines.push (new Line(m));
    m = i*120;
  }
   
   for (var i=0; i < 32; i++){   
   roads.push(new Road(n));
   n = i * 20;
   }
	
   setInterval(pushEnemy, random(0, 2000));
   player = new Car(); 
}

function draw() {
  background(160);
  fill(146,212,1);  
  rect(0,0,150,600);
  rect(450,0,150,600); 
  strokeWeight(10);
  //highway
   stroke(255);
   line(150,0,150,600);
   line(450,0,450,600);
  
   stroke(0);
   strokeWeight(5);
   line(155,0,155,600);
   line(455,0,455,600);
   noStroke();
  
    for (i=0; i < lines.length; i++){
    lines[i].show();
    }
    for (i=0; i < roads.length; i++){
    roads[i].show();
    }
  
    if(keyIsDown(LEFT_ARROW)){
		if(player.x-steer >= 160)
			player.x -= steer;
		else
			player.x = 160;
	}
	if(keyIsDown(RIGHT_ARROW)){
		if(player.x + steer <= 450 - 53)
			player.x += steer;
		else
			player.x = 450 - 53;
	}
    for (i=0; i < lines.length; i++){
		  lines[i].update();
		if (lines[i].y >= height + 120){
            lines[i].y = 0;
		}
    } 
    for (i=0; i < roads.length; i++){
		  roads[i].update();  
		if (roads[i].y >= height + 20){
            roads[i].y = 0;
		} 
    } 
		

	
	for (var i=0; i < enemies.length; i++){
		    enemies[i].show();
            enemies[i].update();
		
	if (enemies[i].y > height){
        enemies.splice(i,1);
		}
		
    }
	
	textSize(20);
	fill("white");
	text ("Score: " + score, 20, 20);
	score = score + 10;
	
	for (var i=0; i <enemies.length; i++){
		if (player.intersects(enemies[i])){
       noLoop();
	   textSize(95);
	   fill("red");
	   text("GAME OVER!", 0, height/2);
	   textSize(50);
	   textAlign(CENTER);
	   fill("black");
	   text("Score: " + score, width/2, height/2 + 100);
	   gameOver = true;
	   
	 }
	
   }

  player.show();

}

function Line (y){
  this.x = 296;
  this.y = y;
  this.width = 8;
  this.height = 60;
  this.speed = speed;
  
  this.show = function (){
      fill(255);
      rect(this.x, this.y, this.width, this.height);
  };

  this.update = function (){
      this.y = this.y + speed;
  };
  
}

function Car(){
  this.x = width/2;
  this.y = 530;
  this.w = 38;
  this.h = 54;
  
  
    this.show = function (){
     
      noFill();
	  noStroke();
	  rect(this.x, this.y, this.w, this.h);
	  push();
      translate(this.x, this.y);
      fill("red");
      noStroke();
      rect(0,10,4,13);
      rect(0,37,4,17);
      rect(4,3,5,7);
      fill("white"); 
      rect(4,10,5,10);
      fill("red");
      rect(4,20,5,21);
      fill("black");
      rect(4,40,5,7);
      fill("red");
      rect(4,47,21,3);
      fill("black");
      rect(4,50,30,4);
      fill(164,0,0); //dark red
      rect(34,50,4,4);
      fill("black");
      rect(38,13,4,41);
      rect(34,10,4,40);
      rect(42,20,4,18);
      rect(42,47,4,3);
      fill(164,0,0); //dark red
      rect(30,3,4,47);
      rect(25,0,5,50);
      fill("black");
      rect(25,0,5,3);
      rect(30,3,4,4);
      rect(30,23,4,14);
      rect(25,40,5,7);
      fill("red");
      rect(9,0,16,50);
      fill("black");
      rect(17,13,4,4);
      rect(13,17,12,6);
      rect(9,20,4,17);
      rect(13,34,12,6);
      fill("white");
      rect(13,27,4,7);
      rect(9,37,4,3);
      pop();	
  };
  this.intersects = function(other){
		if (this.x < other.x + other.w &&
			this.x + this.w > other.x &&
			this.y < other.y + other.h &&
			this.h + this.y > other.y) {
				  
			     return true;
    } else {
      return false;
	}
		
	};
}

function Road(y){
  this.y = y;
  this.speed = speed;
  
  this.show = function(){
      fill(0);
      rect(145, this.y, 10, 10);
      rect(445, this.y, 10, 10);
  };
  this.update = function (){
      this.y = this.y + speed;
  };
}

function Enemy(x, y, w, h){
	this.x = x;
    this.y = y;
	this.w = w;
	this.h = h;
	this.speed = speed;
  
    this.show = function (){
      noFill();
	  noStroke();
      rect(this.x, this.y, this.w, this.h);
	  push();
      translate(this.x, this.y);
      fill("yellow");
      noStroke();
      rect(0,10,4,13);
      rect(0,37,4,17);
      rect(4,3,5,7);
      fill("white"); 
      rect(4,10,5,10);
      fill("yellow");
      rect(4,20,5,21);
      fill("black");
      rect(4,40,5,7);
      fill("yellow");
      rect(4,47,21,3);
      fill("black");
      rect(4,50,30,4);
      fill("#999900"); //dark yellow
      rect(34,50,4,4);
      fill("black");
      rect(38,13,4,41);
      rect(34,10,4,40);
      rect(42,20,4,18);
      rect(42,47,4,3);
      fill("#999900"); //dark yellow
      rect(30,3,4,47);
      rect(25,0,5,50);
      fill("black");
      rect(25,0,5,3);
      rect(30,3,4,4);
      rect(30,23,4,14);
      rect(25,40,5,7);
      fill("yellow");
      rect(9,0,16,50);
      fill("black");
      rect(17,13,4,4);
      rect(13,17,12,6);
      rect(9,20,4,17);
      rect(13,34,12,6);
      fill("white");
      rect(13,27,4,7);
      rect(9,37,4,3);
      pop();
    };
  
	this.update = function(){
		if (this.y > height){
		this.y = 0;
		}else{
		this.y = this.y + this.speed;
		}	
	};
	
	
}

function pushEnemy(){
	while (enemies.length < 5){    
  	   var enemy = {
		 x: Math.round(random(160,397)),
		 y: 0,
		 w: 38,
		 h: 54
		}

   var overlapping = false;
     
   for (var j=0; j < enemies.length; j++){   
	  var other = enemies[j];
	  
	 if (enemy.x < other.x + other.w &&
			enemy.x + enemy.w > other.x &&
			enemy.y < other.y + other.h &&
			enemy.h + enemy.y > other.y) {
		   overlapping = true;		
		
	  }
   }
   
  if (!overlapping){
	  enemies.push(new Enemy(enemy.x, enemy.y, enemy.w, enemy.h));
 	}

	protection ++;
	
	if (protection = 1000){
		break;
	}
 }
}