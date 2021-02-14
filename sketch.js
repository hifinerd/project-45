
var paddle, ball
var gameState = "serve"
//gameState = serve: life lost or game started
//gameState = play: ball served
//gameState = over: lost all lives
var alienGroup, alien

function setup() {
  createCanvas(600,800);
  edges=createEdgeSprites();
  paddle = createSprite(300,750,100,20)
  ball = createSprite(300,725,25,25)
  alienGroup = new Group()
  ball.shapeColor = "red"
}

function draw() {
  background(0);  
  if(keyDown("right")){
    paddle.x = paddle.x+9
  }
  if(keyDown("left")){
    paddle.x = paddle.x-9
  }
  if (keyDown("space") && gameState === "serve") {
    ball.velocityY = -11;
    ball.velocityX = -10
    gameState = "play";
  }
  //make the ball bounce off the user paddle
  if(ball.isTouching(paddle)){
    ball.bounceOff(paddle)
  }
  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[0]) || ball.isTouching(edges[1]) || ball.isTouching(edges[2])) {
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
  }
  if (paddle.isTouching(edges[0]) || paddle.isTouching(edges[1]) || paddle.isTouching(edges[2])) {
    paddle.bounceOff(edges[0]);
    paddle.bounceOff(edges[1]);
    paddle.bounceOff(edges[2]);
  }
 /* if (alienGroup.isTouching(ball)){
    alienGroup.destroyEach()
  }*/
  for(var i=0;i<alienGroup.length;i++){
    if(alienGroup[i].isTouching(ball)){
      alienGroup[i].destroy();
    }
  }

  if (alienGroup.isTouching(edges[0]) || alienGroup.isTouching(edges[1]) || alienGroup.isTouching(edges[2]) || alienGroup.isTouching(edges[3])) {
    alienGroup.bounceOff(edges[0]);
    alienGroup.bounceOff(edges[1]);
    alienGroup.bounceOff(edges[2]);
    alienGroup.bounceOff(edges[3]);
  }
  if (ball.y > 810){
    ball.x = 300
    ball.y = 725
    ball.velocityX = 0
    ball.velocityY = 0
    gameState = "serve"
  }
  spawnAliens();
  drawSprites();
  console.log(alienGroup)
}
function spawnAliens(){
  if (frameCount % 60 === 0){
   alien = createSprite(300,300,20,20);
    
     //generate random obstacles
     var randX = Math.round(random(1,10));
     var randY = Math.round(random(1,10));
     alien.velocityX = randX
     alien.velocityY = randY;
     alienGroup.add(alien); 
     alien.lifetime = 500
     }
    
    //add each obstacle to the group

  }
 