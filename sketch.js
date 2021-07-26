var ghost, ghostImg;
var door, doorImg, doorsGroup;
var tower, towerImg;
var climberImg, climbersGroup, climber;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var spookySound

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  
  spookySound = loadSound("spooky.wav");
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function setup() {
  createCanvas(600,600);
  spookySound.loop(); 
  tower = createSprite(300, 300);  
  tower.addImage(towerImg);
  tower.velocityY = 10;
  
  ghost = createSprite(300, 450, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
}
  
function draw() {
  background(0);  
  
  if(gameState === "play")  {
    
  
  
  if(tower.y > 400) {
     tower.y = 300;
     
  }
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x - 3;
  }
    
  if(keyDown("right_arrow")) {
   ghost.x = ghost.x +3;
  }
  
  if(climbersGroup.isTouching(ghost)) {
    gamestate = "end" ;    
  }    
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600) {
   ghost.destroy();
   gameState = "end"; 
  
  }
  
  spawnDoors();
  drawSprites(); 
 }   
  
  if(gameState === "end") {
   stroke("yellow");
   fill("yellow");
   textSize(30); 
   text("game over", 230, 250);
    
  }
  
}

function spawnDoors() {
  if(frameCount%240 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImg);    
    
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120, 400));
    door.velocityY = 7;
    
    climber.x = door.x;
    climber.velocityY = 7;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 3;

    ghost.depth = door.depth + 1;
    
    door.lifetime = 300;
    climber.lifetime = 300;
    invisibleBlock.lifetime = 300;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
     
  
  
}