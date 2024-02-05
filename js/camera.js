let camera = {
  position: { x: 0, y: 0},
  width: 400,
  height: 200,
};

let cameraX;
let cameraY;

function cameraСoordinates() {
  cameraX = -camera.position.x + 5;
  cameraY = -camera.position.y + 25;
}

function drawCamera() {
  let cameraBox = {
    position: { x: player.hitbox.position.x + paddleWidth - 200 , y: player.y - 100  },
    width: 400,
    height: 200,
  };

  const cameraBoxRightSide = cameraBox.position.x + cameraBox.width;
  const cameraBoxUpSide = cameraBox.position.y + cameraBox.height;

  if (cameraBoxRightSide >= fcanvas.width) {
    camera.position.x = -(fcanvas.width - scaledCanvasWidth);
  } else if (cameraBoxRightSide >= scaledCanvasWidth + Math.abs(camera.position.x)) {
    camera.position.x -= movement;
  } 

  if (cameraBox.position.x <= 0) {
    camera.position.x = 0;
  } else if (cameraBox.position.x <= Math.abs(camera.position.x)) {
    camera.position.x += movement;
  } 

  if (cameraBoxUpSide >= fcanvas.height) {
    camera.position.y = -(fcanvas.height - scaledCanvasHeight);
  } else if (cameraBoxUpSide >= scaledCanvasHeight + Math.abs(camera.position.y)) {
    camera.position.y -= gravitySpeed;
  } 

  if (cameraBox.position.y <= 0) {
    camera.position.y = 0;
  }  else if (cameraBox.position.y <= Math.abs(camera.position.y)) {
    camera.position.y += jumpHeight;
  } 


  // ctx.beginPath();
  // ctx.rect(cameraBox.position.x, cameraBox.position.y, cameraBox.width, cameraBox.height);
  // ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
  // ctx.fill();
  // ctx.closePath();
}