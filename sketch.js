var purpleNinja, money, diamonds, jewellery, sword, platforms;
var purpleNinjaImg, moneyImg, diamondsImg, jewelleryImg, swordImg, roadImg;
var treasureCollection = 0;
var moneyG, diamondsG, jewelleryG, swordGroup, platformsGroup, solidGroup;
var gravity=1
var circlePosition;
var currentPlatformLocation = -width;
var runningAnimation;
var jumpingAnimation;
var gameBackground;
var platformBackground;
var gameFont;
var gameMusic;
var gameOverMusic;
var jumpSound; 
var gameOver = false;
var jumpPower = 15;
var purpleNinjaSpeed = 15;
var currentBackgroundTilePosition;
var backgroundTiles;
var playScore = 0;

var play=1;
var END=0;
var gameState=1;


function preload(){
    jumpingAnimation = loadAnimation(
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump00.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump01.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump02.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump03.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump04.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump05.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump06.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump07.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump08.png',     
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump09.png'    
      );
      runningAnimation = loadAnimation(
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run00.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run01.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run02.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run03.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run04.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run05.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run06.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run07.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run08.png',     
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run09.png'    
      );
}

function setup() {
    createCanvas(840,390);
    background(200, 200, 200);
    platformsGroup = new Group;
    moneyG=new Group();
    diamondsG=new Group();
    jewelleryG=new Group();
    swordGroup=new Group();
    purpleNinja = createSprite(50,100,25,40);
    purpleNinja.depth = 4;
    purpleNinja.addAnimation('jump', jumpingAnimation);
    purpleNinja.addAnimation('run', runningAnimation);
    purpleNinja.setCollider("rectangle", 0,0,10,41);
    currentBackgroundTilePosition = -width;
    backgroundTiles = new Group;
    
            
}

function draw() {
    ellipse(circlePosition,200,30,30);
    fill(23,55,100);
    ellipse(mouseX,mouseY,30,30);
    circlePosition = 100; 
    circlePosition = circlePosition + 1; 
    background(200,200,200);
    addNewPlatforms();
    purpleNinja.velocity.y += gravity;
    purpleNinja.collide(platformsGroup, solidGround);        
    if(!gameOver){
        background(200);
        drawSprites();
      }
    
      if(gameOver){
    
      }
  jumpDetection();
  runner.velocity.x = runnerSpeed;
  removeOldPlatforms();
  addNewBackgroundTiles();
  removeOldBackgroundTiles();
fallCheck();
gameOverText();
updateSprites(false);
if(keyDown(UP_ARROW)){
    newGame();
  }
  updateScore();
}

function addNewPlatforms(){
    if(platformsGroup.length < 5){
      var currentPlatformLength = 1132;
      var platform = createSprite((currentPlatformLocation * 1.3), random(300,400), 1132, 336);
      platform.collide(runner);
      currentPlatformLocation += currentPlatformLength;
      platform.addAnimation('default', platformBackground);
      platform.depth = 3;
      platformsGroup.add(platform);
    }
  }

  function solidGround(){
    purpleNinja.velocity.y = 0;
    purpleNinja.changeAnimation("run");
    if(purpleNinja.touching.right){
      purpleNinja.velocity.x = 0;
      purpleNinja.velocity.y+= 30;
    }
  }
     
  function jumpDetection(){
    if(keyWentDown(UP_ARROW)){
      runner.changeAnimation("jump");
      runner.animation.rewind();
      runner.velocity.y = -jumpPower;
    }
  }
  
  
function removeOldPlatforms(){
    for(var i = 0; i < platformsGroup.length; i++){
        if((platformsGroup[i].position.x) < runner.position.x-width){
          platformsGroup[i].remove();
      }
    }
  }
 
  
function addNewBackgroundTiles(){
    if(backgroundTiles.length < 3){
      currentBackgroundTilePosition += 839;
      var bgLoop = createSprite(currentBackgroundTilePosition, height/2, 840, 390);
      bgLoop.addAnimation('bg', gameBackground);
      bgLoop.depth = 1;
      backgroundTiles.add(bgLoop);
    }
  }
  
  function removeOldBackgroundTiles(){
    for(var i = 0; i < backgroundTiles.length; i++){
        if((backgroundTiles[i].position.x) < runner.position.x-width){
          backgroundTiles[i].remove();
      }
    }
    function fallCheck(){
        if(runner.position.y > height){
            gameOver = true;
          }
      }}
      
      function gameOverText(){
        background(0,0,0,10);
        fill('white');
        stroke('black')
        textAlign(CENTER);
        textFont(gameFont);
    
        strokeWeight(2);
        textSize(90);
        strokeWeight(10);
        text("GAME OVER", camera.position.x, camera.position.y);
    
        textSize(15);
        text("Jump to try again", camera.position.x, camera.position.y + 100);
        textSize(20);
        text("You ran " + playerScore + ' meters!', camera.position.x, camera.position.y + 50);
    }
   
    function newGame(){
        platformsGroup.removeSprites();
        backgroundTiles.removeSprites();
        gameOver = false;
        updateSprites(true);
        purpleNinjaSpeed = 15;
        purpleNinja.position.x = 50;
        purpleNinja.position.y = 100;
        purpleNinja.velocity.x = runnerSpeed;
        currentPlatformLocation = -width;
        currentBackgroundTilePosition = -width;
      }
       
    function updateScore(){
        if(frameCount % 60 === 0){
          playerScore++;
        }
        fill('white');
        textFont(gameFont);
        strokeWeight(2);
        stroke('black');
        textSize(20);
        textAlign(CENTER);
        text(playerScore, camera.position.x + 350, camera.position.y + 160);
      }

function newGame(){
playerScore = 0;

}

function createCash() {
    if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
    }
  }
  
  function createDiamonds() {
    if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
  }
  
  function createJewellery() {
    if (World.frameCount % 410 == 0) {
    var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewellery.addImage(jewelleryImg);
    jewellery.scale=0.13;
    jewellery.velocityY = 3;
    jewellery.lifetime = 150;
    jewelleryG.add(jewellery);
    }
  }
  
  function createSword(){
    if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
    }
  }