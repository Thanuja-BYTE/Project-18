
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;      
var FoodGroup, obstacleGroup;
var survivalTime=0;  


var gameOver, restart;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.jpg");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  monkey=createSprite(80,height-315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(width/2,height,width,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
   gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.2;
  
   gameOver.visible = false;
  restart.visible = false;
  

  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
  
  
  
}


function draw() {
   background(255);
  
 if(gameState === PLAY){
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/getFrameRate());
  text("Survival Time:"+ survivalTime, 100,50);
   
 
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if((touches.length>0||keyDown("space")) && monkey.y >= 159){
    monkey.velocityY=-12;
    touches=[];
  }
   monkey.velocityY = monkey.velocityY + 0.8;
 
  
   
  spawnbananas();
  spawnObstacles();
  
   if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
 }
   else if (gameState === END) {
      ground.velocityX = 0;
     
      gameOver.visible = true;
    restart.visible = true;
     
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
 
  }  
  
  monkey.collide(ground);
  
   if(mousePressedOver(restart)) {
      reset();
    }
  
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(width-100,height-30,10,40);
   obstacle.velocityX = -5;
    obstacle.scale = 0.13;
   obstacle.addImage(obstacleImage);
    obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
   
 }
}
    
function spawnbananas() {
 
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,250,40,10);
    banana.y= Math.round(random( height-300,height-280 ));
    banana.addImage(bananaImage);
    banana.scale =0.1;
    banana.velocityX = -3; 
    

   banana.lifetime = 200;
    
 bananasGroup.add(banana);
    
  }
}    
 
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  