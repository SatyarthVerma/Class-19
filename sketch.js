var trex  , treximg , ground , groundimg , invground , cloudimg , o1 ,o2,o3,o4,o5,o6 , gameOver , restart, gameOverimg , restartimg , count; 
var PLAY = 1
var END = 0
var obstacleGroup , cloudGroup;
var gameState = PLAY
function preload(){
treximg=loadAnimation("trex1.png", "trex3.png","trex4.png");
  groundimg=loadImage("ground2.png");
  cloudimg = loadImage ("cloud.png")
  o1=loadImage("obstacle1.png")  
    o2=loadImage("obstacle2.png")
    o3=loadImage("obstacle3.png")
    o4=loadImage("obstacle4.png")
    o5=loadImage("obstacle5.png")
    o6=loadImage("obstacle6.png")
   gameOverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
}


function setup() {
  createCanvas(600,200);
  trex = createSprite(50,180);
  trex.addAnimation("trex",treximg);
  trex.scale=0.5;
  ground=createSprite(200,180);
  ground.addImage("ground",groundimg);
  invground=createSprite(200,195,400,20);
  invground.visible=false;
  cloudGroup = new Group ();
  obstacleGroup = new Group ();
  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver",gameOverimg)
  gameOver.scale = 0.5
  restart = createSprite(300,130)
  restart.addImage("restart",restartimg)
  restart.scale = 0.45
}

function draw() {
  background(180);
  
  trex.collide(invground);
 
  stroke("black")
  strokeWeight(4)
  text("Score: "+ count, 500, 50);
  

 
  if(gameState===PLAY){
     ground.velocityX=-10;
     trex.velocityY=trex.velocityY+1
       count = Math.round(frameCount/4);
    gameOver.visible = false ;
    restart.visible = false ;
    if(ground.x<0){
  ground.x = ground.width/2  ;
  }
    if(keyDown("space")&&trex.y>161){
trex.velocityY=-12
   }
    if(obstacleGroup.isTouching(trex)){
    gameState = END }
     spawnObstacles();
  spawnClouds();
     }else if(gameState===END){
       gameOver.visible = true  ;
    restart.visible = true ;
       ground.velocityX= 0      
       trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
       cloudGroup.setLifetimeEach(-1)
       obstacleGroup.setLifetimeEach(-1)
      // if(mousePressedOver(restart)){
       ///  
        //  }
              }
  
  
  drawSprites();
}


function spawnClouds(){
if(frameCount%50===0){
   var cloud =createSprite (600,random(80,120))
   cloud.addImage("cloud.png",cloudimg)
   cloud.velocityX=-4
  cloud.scale = random (0.5,1)
  
cloud.depth = trex.depth ;
  trex.depth++
   cloudGroup.add(cloud)
   }
  
}

function spawnObstacles(){
if(frameCount%60===0){
   var obstacles =createSprite(600,165)
   obstacles.velocityX=ground.velocityX
  obstacles.scale=0.7
   var rand = Math.round(random(1,6))
   console.log(rand)
   switch(rand){
     case 1:obstacles.addImage(o1);
         break ; 
    case 2:obstacles.addImage(o2);
         break ;
          case 3:obstacles.addImage(o3);
         break ;
          case 4:obstacles.addImage(o4);
         break ;
          case 5:obstacles.addImage(o5);
         break ;
          case 6:obstacles.addImage(o6);
         break ;
         default:break;
   }
  obstacleGroup.add(obstacles)
  
   }

}