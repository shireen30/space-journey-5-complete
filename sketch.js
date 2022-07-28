var spacebg, rocketimg, coinimg, rockimg, fireimg;
var spacebgimg , rocket , coin , fire , rock
var rocksgroup , firegroup , coinsgroup
var score = 0 
var lives = 3
var gameState=0;
var gameOver , gameOverImg
var powerupSound, gameoverSound,rockdestroySound, fireSound;
var starImg,stargroup;
var starTouch=false;
var starSound;
//WAIT is GAME STATE 0 PLAY is 1 and END is 2

function preload(){
  spacebgimg = loadImage("assets/spacebg.jpg");
  rocketimg = loadImage("assets/rocket.png");
  rockimg = loadImage("assets/rock.png");
  coinimg  = loadImage("assets/coin.png");
  fireimg = loadImage("assets/fire.png");
  gameOverImg = loadImage("assets/gameover.jpg")
  powerupSound = loadSound("assets/powerupsd.mp3");
  rockdestroySound = loadSound("assets/rockdestroy.mp3");
  gameoverSound = loadSound("assets/gameover.wav");
  fireSound = loadSound("assets/firesound.mp3");
  starImg=loadImage("assets/star.png");
  starSound=loadSound("assets/success.mp3");
}


function setup(){
  
createCanvas(windowWidth,windowHeight);

spacebg = createSprite(windowWidth/2, windowHeight/2)
spacebg.addImage("spacebg", spacebgimg);
spacebg.scale = 2.5
//

rocket = createSprite(300,600,20,50)
rocket.addImage("rocket", rocketimg)
rocket.scale = 0.5

rocket.debug=false;
rocket.setCollider("rectangle",0,0,300,380);

gameOver = createSprite(windowWidth/2, windowHeight/2)
gameOver.addImage("gameOver",gameOverImg)
gameOver.scale = 0.5

rocksgroup = createGroup();
firegroup = createGroup();
coinsgroup = createGroup();
stargroup=createGroup();

}

function draw() {
background(0)
drawSprites();
if(gameState==0){
  gameOver.visible = false
  textSize(30);
  fill("yellow");
text("Press UP Arrow Key to START The GAME!!!",windowWidth/2-230,windowHeight/2);
fill("red");
text("USE YOUR Mouse To Move The Rocket!!!",windowWidth/2-230,windowHeight/2+150);
}
console.log(windowHeight)
//console.log(mouseX, mouseY)

if(keyDown("up")){
  gameState=1;
  }

if(gameState==1){

  spacebg.velocityY=3;
if(spacebg.y>windowHeight/2+100){
  spacebg.y=windowHeight/2;
}

if(rocket.isTouching(coinsgroup)){
  score += 10
  coinsgroup.destroyEach()
  powerupSound.play()

}

rocket.x=mouseX

if(rocket.isTouching(stargroup)){
starTouch=true;

  starSound.loop();


stargroup.destroyEach();
}
if(starTouch){
  setTimeout(() => {
   
   starTouch=false;
   starSound.stop();
  }, 5000);

}
console.log(starTouch)
if(rocket.isTouching(rocksgroup) && lives>0 && !starTouch){
 rocket.scale-=0.1
 lives-=1
rocksgroup.destroyEach();
rockdestroySound.play();
}
else if(rocket.isTouching(firegroup) && lives>0  && !starTouch){
  rocket.scale-=0.1;
  lives-=1;
  firegroup.destroyEach();
  fireSound.play();
}
if(lives<=0){
   gameState=2;

}

spawnRocks();
spawnFire();
spawnCoins();
if(score>=10){
spawnStar();
}
  

  textSize(30)
  fill("white")
  text("Score : "+score,50,60)
  text("Lives : " +lives,50,100)

}

if(gameState==2){
  gameOver.visible = true
  gameOver.scale = 0.8
  spacebg.velocityY=0;
  firegroup.destroyEach();
  rocksgroup.destroyEach();
  coinsgroup.destroyEach();
  fireSound.stop();

  if(!gameoverSound.isPlaying()){
  gameoverSound.play();
  gameState=3;
  }
  
}
  }

  function spawnRocks(){
    if(frameCount %110===0){
      var rock = createSprite(300,280,20,10)
      rock.addImage("rock", rockimg)
      rock.velocityY = 7
      rock.x = Math.round(random(100,windowWidth-100))
      rock.scale = 0.5
      rocksgroup.add(rock)
      rock.debug=false;
      rock.setCollider("circle",0,0,140)
    }
  }

  function spawnStar(){
    if(frameCount %150 ===0){
      var star = createSprite(300,200,10,30)
      star.addImage("star",starImg)
      star.velocityY = 6
      star.x = Math.round(random(50,windowWidth-50))
      star.scale = 0.2
      stargroup.add(star)
     
    }
  }

  function spawnFire(){
    if(frameCount %150 ===0){
      var fire = createSprite(300,200,10,30)
      fire.addImage("fire",fireimg)
      fire.velocityY = 6
      fire.x = Math.round(random(200,windowWidth-100))
      fire.scale = 0.5
      firegroup.add(fire)
      fire.debug=false;
      fire.setCollider("rectangle",0,0,120,280)
    }
  }

  function spawnCoins(){
    if(frameCount %170 ===0){

      var coin = createSprite(200,150,10,20)
      coin.addImage("coin", coinimg)
      coin.velocityY = 5
      coin.x = Math.round(random(300,windowWidth-100))
      coin.scale = 0.2
      coinsgroup.add(coin)
    }

  }
