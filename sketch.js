let ground;
var lander_img;
var bg_img;
var fuel =100;
var thrusting;
var thrust
var lthrust,rthrust;
var lander,lander2,lander3
var normal;
var lz,lz_img;

var carsh,crash2,crash3



var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrusting= loadAnimation("normal1.png")
  crash= loadAnimation("crash.png","crash2.png","crash3.png");
  land = loadAnimation("lander.png","lander2.png","lander3.png");
  normal = loadAnimation("normal.png");
  lthrust = loadAnimation("leftthruster.png");
  rthrust = loadAnimation("rightthruster.png");
  lz_img = loadImage("lz.png");


thrusting.playing= true;
thrusting.looping=false;
rthrust.looping = false;
lthrust.looping = false;

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(80);
  timer=1500;

  thrusting.framDelay=5;
 rthrust.frameDelay=5;
 lthrust.frameDelay=5;


  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.4
 
  lander.addAnimation('thrusting',thrusting);
  lander.addAnimation('left',lthrust);
  lander.addAnimation('right',rthrust);
  lander.addAnimation('normal',normal);
  lander.addAnimation('crashing',crash);
  lander.addAnimation('landing',land)

  ground = createSprite(500,690,2100,20);
  lz = createSprite(1300,580,50,30);
  lz.addImage('stone',lz_img);
  lz.scale = 0.9;

  ground.visible =false;


  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  textSize(30);
  fill("black");
  text("Horizontal Velocity: " +round(vx,2),800,75);
  text("Fuel: "+fuel,800,50);
  text("Vertical Velocity: "+round(vy),800,100);
  pop();

  //fall down
  vy +=g;
  lander.position.y+=vy;
  lander.position.x +=vx;

  if(lander.collide(lz)==true)
  {
    lander.changeAnimation('crashing',crash);
    stop();
  }

  
  var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
  console.log(d);

  if(d<=35 && (vy<2 && vy>-2 ) && (vx<2 && vx >-2) )
  {
    console.log("landed");
    vx = 0;
    vy = 0;
    g=0;
    lander.changeAnimation('landing');
  }

  if(lander.collide(ground)==true)
  {
    console.log("collided");
    lander.changeAnimation('crashing');
    vx = 0;
    vy = 0;
    g = 0;
  }

  
  drawSprites();
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx += 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx -= 0.2;
  fuel-=1;
}


