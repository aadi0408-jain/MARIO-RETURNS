var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var mario, marioRunning, mario_collided;

var bg, invisibleGround;

var pipe, pipeGroup, pipeImage;

var brick, brickGroup;

var cactus, cactusGroup;

var dragon, dragonGroup;

var star1, star2, starImage1, starImage2, starGroup1, starGroup2;

var coinSound, gameOverSound;

var gameOver, gameOverImage;

function preload(){
marioRunning = loadAnimation("mario1-removebg-preview.png", "mario_2-removebg-preview.png", "mario_3-removebg-preview.png");
  
mario_collided = loadAnimation("download-removebg-preview.png");
  
background = loadImage("background-simple.png");
  
pipeImage = loadImage("pipe.png");
  
goombaImage = loadAnimation("goomba1.png", "goomba2.png", "goomba3.png");
  
brickImage = loadImage("brick block.png");
  
cactusImage = loadImage("cactus.png");
  
dragonImage = loadImage("dragon.gif")
  
starImage1 = loadImage("star2.png");
  
starImage2 = loadImage("star2.png");
   
gameOverImage = loadImage("game over.png");
  
coinSound = loadSound("sikka.mp3");

gameOverSound = loadSound("y2mate.com - Mario Death - Sound Effect (HD).mp3");
  
}
                        
function setup() {
  createCanvas(600, 200);
  
  bg = createSprite(300, 100, 600, 200);
  bg.addImage(background);
  bg.x = bg.width /2;
  
  invisibleGround = createSprite(200, 197, 400, 10);
  invisibleGround.visible = false;
  
  mario = createSprite(50,160,20,50);
  mario.addAnimation("running", marioRunning);
  mario.addAnimation("collided", mario_collided);
  mario.scale = 0.4;
  
  gameOver = createSprite(300, 100, 50, 50);
  gameOver.addImage("end", gameOverImage);
  gameOver.scale = 0.5;
  gameOver.depth = 10;
  
  pipeGroup = new Group();
  brickGroup = new Group();
  cactusGroup = new Group();
  dragonGroup = new Group();
  starGroup1 = new Group();
  starGroup2 = new Group();
  
  score = 0;
  
}

function draw() {
  
  if (keyDown("r") && gamestate === end){
    
    reset();
    
  }
  if (gameState === PLAY){

      gameOver.visible = false;
  
    // if (mario.x != 50){
    //   mario.x = 50;
    // }
    
    if (starGroup1.isTouching(mario)){
      score = score + 1;
      starGroup1.destroyEach();
      coinSound.play();
      
    }
    if (starGroup2.isTouching(mario)){
      score = score + 1;
      starGroup2.destroyEach();
      coinSound.play();
    }
    
    bg.velocityX = -6;
    if (bg.x < 0) { 
    
      bg.x = bg.width/2;
    
   }
    
    invisibleGround.velocityX = -6;
    if (invisibleGround.x < 0) { 
    
      invisibleGround.x = invisibleGround.width/2;
    }
  
    if(keyDown("space")&& mario.y >= 100) {
    mario.velocityY = -12;
    }
    
    //add gravity
    mario.velocityY = mario.velocityY + 0.8;
    
    if (mario.isTouching(brickGroup)){
    mario.velocityX = 20;
  }
  else if(mario.x > 50){
    mario.velocityX = -10;
  }
  else if (mario.x < 50) {
    mario.velocityX = 0;
    mario.x = 50;
  }
    
  spawnPipe();
  spawnBrick();
  spawnCactus();
  spawnDragon();
  spawnStar();
  spawnStar2();
    
    if (cactusGroup.isTouching(mario)){
      gameState = END;
      gameOverSound.play();
      mario.changeAnimation(mario_collided);
    }
    if (dragonGroup.isTouching(mario)){
      gameState = END;
      gameOverSound.play();
      mario.changeAnimation(mario_collided);
    }
    if (mario.isTouching(pipeGroup)){
      gameState = END;
      gameOverSound.play();
      mario.changeAnimation(mario_collided);
    }    
  }
  
    else if(gameState === END){
    
    mario.changeAnimation("collided", mario_collided);
    gameOver.visible = true;
    bg.velocityX = 0;
    dragonGroup.setVelocityXEach(0);
    pipeGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);
    starGroup1.setVelocityXEach(0);
    starGroup2.setVelocityXEach(0);
    mario.velocityY = mario.velocityY + 0.8;
    mario.collide(invisibleGround);
      
    fill("black");
    textSize(24);
    textFont("Arial");
    text("Press 'R' to restart", 250, 150);
      
  }
  
  console.log("X pos before");
  console.log(mario.x);   
  console.log("frames before");
  console.log(frameCount);
  
  drawSprites();
  
  mario.collide(invisibleGround);

  fill("black");
  textSize(25);
  textFont("Ink Free");
  text("Score : " + score, 500,50);
  
  console.log("X pos");
  console.log(mario.x);   
  // console.log("frames");
  // console.log(frameCount);
  
} 

  function spawnPipe(){
 if (frameCount % 500 === 0){
   var pipe = createSprite(600,170,10,40);
   pipe.velocityX = -6;
   pipe.addImage(pipeImage);
   
    //assign scale and lifetime to the obstacle           
    pipe.scale = 0.18;
    pipe.lifetime = 300;
   
   //add each obstacle to the group
    pipeGroup.add(pipe);

 }
}

function spawnBrick(){
  if(frameCount % 200 === 0){
    brick = createSprite(600, 50, 20, 50);
    brick.y = Math.round(random(75, 100));
    brick.addImage(brickImage);
    brick.velocityX = -7;
    brick.scale = 0.3;
    brick.lifetime = 300;
    brickGroup.add(brick);
  }
}
function spawnCactus(){
  if (frameCount % 650 === 0){
    cactus = createSprite(600, 170, 10, 40);
    cactus.velocityX = -6;
    cactus.addImage(cactusImage);
    cactus.scale = 0.2;
    
    cactusGroup.add(cactus);
  }
}
function spawnDragon(){
  if (frameCount % 1000 === 0){
    dragon = createSprite(600, 125, 10, 40);
    dragon.velocityX = -7;
    dragon.addImage(dragonImage);
    dragon.scale = 0.5;
    dragonGroup.add(dragon);
    
  }
}
function spawnStar(){
  if(frameCount%900===0){
    star = createSprite(600, 170, 50, 50);
    star.addImage("tara1", starImage1);
    star.collide(invisibleGround);
    star.velocityX = -6;
    star.scale = 0.2;
    starGroup1.add(star);
  }
}
function spawnStar2(){
  if (frameCount% 200 === 0){
    star2 = createSprite(600, 100, 50, 50);
    star2.addImage("tara2", starImage2);
    star2.scale = 0.2;
    star2.velocityX = -7;
    star2.x = brick.x;
    star2.y = brick.y;
    star2.y = star2.y - 25;
    starGroup2.add(star2);
  }
}
function reset(){
  
  gameState = PLAY;
  
  mario.changeAnimation("mario", marioRunning);
  
  score = 0;
  
  mario.scale = 0.4;
  
}