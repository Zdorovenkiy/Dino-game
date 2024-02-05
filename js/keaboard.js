document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
    rightPressed = true;
  }
  if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
    leftPressed = true;
  }
  if (e.key === "Up" || e.key === "ArrowUp" || e.key === "w") {
    jumpPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
    rightPressed = false;
  } 
  if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
    leftPressed = false;
  } 
}

function jump() {
  if (stop) {
    jumpCount=0;
    jumpPressed=false;
    jumpHeight=0;
    istest = false;
    return;
  }

  if (!jumpProceed) {
    if (!isFlying) {
      jumpCount=0;
      jumpPressed=false;
      jumpHeight=0;
      istest = false;
      return;
    }
  }

  if (lastDirection === "left") 
    player.switchSprite("jumpLeft");
  else
    player.switchSprite("jumpRight");

    gravitySpeed = 0;
    jumpProceed = true;
    jumpCount++;
    jumpHeight = 5;
    player.y -= jumpHeight

  if (jumpCount >= jumpLength) {
    jumpProceed = false;
    jumpCount=0;
    jumpPressed=false;
    jumpHeight=0;
  }  
}

function invulnerableTimeCheck(count) {
  if (count == 2) {
    invulnerable = false;
    return;
  }
}

async function invulnerableTime() {
  invulnerable = true;

  for (let i = 0; i < 3; i++) {
    setTimeout(invulnerableTimeCheck, 1000, i)
  }
}

function isFlight() {
  for (item of objectArray) {
        if (player.hitbox.position.x + player.hitbox.width > item.x &&
              player.hitbox.position.x < item.x + item.width &&
              player.hitbox.position.y + player.hitbox.height + gravitySpeed + 1 >= item.y &&
              player.hitbox.position.y + player.hitbox.height <= item.y + item.height) {
      isFlying = true;
      break;
    } else {
      isFlying = false;
    }
  }
}