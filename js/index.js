// const canvas = document.getElementById("myCanvas");
const fcanvas = new fabric.Canvas("myCanvas");
const ctx = fcanvas.getContext("2d");
// let load = false;

let url = "./images/background1.png";
let urlFloor = "./images/grassFloor.png";
let urlCoin = "./images/coin.png";

let scaledCanvasWidth = fcanvas.width / 2; 
let scaledCanvasHeight = fcanvas.height / 2; 

let paddleX = 50; 
let paddleY = 5 ; 
let paddleWidth = 23;   
let paddleHeight = 53;  
let movement = 0;

let jumpCount = 0;
let jumpLength = 20;
let jumpHeight = 0;

let invulnerable = false;

let time = 0;

let gravity = 0.1;
let gravitySpeed = 0

let rightPressed = false;
let leftPressed = false;
let jumpPressed = false;

let stop = false;
let isFlying = true;
let jumpProceed = false;
let lastDirection = "right";

let player;
let objectArray = [];
let unitArray = [];
let coinArray = [];
let floorCollisions2D = []
let collisionBlocks = []

let level = 1;

+function() {
 setInterval(() => time++, 1000);
}();

let levels = {
  1: {
    init: () => {
      floorCollisions2D = []
      collisionBlocks = []
      drawLevel(floorCollisions);   
        
    }
  },
  2: {
    init: () => {
      floorCollisions2D = []
      collisionBlocks = []
      objectArray = [];
      unitArray = [];
      coinArray = [];
      fcanvas.clear();
      drawLevel(floorCollisions2);
    }
  },
}

function drawBackground() {
  fcanvas.setBackgroundImage(url, function() {
    let img = fcanvas.backgroundImage;
    img.originX = 'left';
    img.originY = 'top';
    img.scaleX = fcanvas.getWidth() / img.width;
    img.scaleY = fcanvas.getHeight() / img.height;
  });

  fcanvas.renderAll();
}

function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, fcanvas.width, fcanvas.height);

  drawBackground();

  stop = false;

  ctx.save();
  //  ctx.scale(2, 2);
  //  ctx.translate(camera.position.x, camera.position.y);

  unitArray.forEach((unit) => {
    unit.update();
    unit.move();
  })

  coinArray.forEach((coin) => {
    coin.update();
  })

  player.update();

  cameraСoordinates();
  drawCamera();

  drawTimer();
  drawScore();
  drawPlayerHealth();

  gravitySpeed += gravity;

  isFlight();
  collisionDetection();

  if (rightPressed) {
    lastDirection = "right";
    player.switchSprite("walkRight");
    movement = 3;
    player.x = Math.min(player.x + movement, fcanvas.width - paddleWidth);
  } else if (leftPressed) {
    lastDirection = "left";
    player.switchSprite("walkLeft");
    movement = 3;
    player.x = Math.max(player.x - movement, 0);
  } else {
      if (lastDirection === "left") 
        player.switchSprite("idleLeft")
      else
        player.switchSprite("idleRight")
    }

  if (!isFlying) {
    if (lastDirection === "left")
      player.switchSprite("fallLeft")
    else
      player.switchSprite("fallRight")
  } 
  
  if (jumpPressed) {
    jump();
  }
  player.y += gravitySpeed; 
  if (player.health <= 0) {
    document.location.reload();
  }
  
  if (player.score == 400) {
    level++;
    player.score = 0;
    levels[2].init();
  }

  ctx.restore();
}

levels[level].init();
draw();

// построение уровня +-
// экран смерти +=
// набор очков +-
//переход на другую локацию +=
// оформление
