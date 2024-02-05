function drawPlayerHealth() {
  ctx.beginPath();
  ctx.font = "25px serif";
  ctx.fillStyle = "blue";
  ctx.fillText(`Health: ${player.health}`, cameraX, cameraY);
  ctx.fill();
  
  ctx.closePath();
}

function drawTimer() {
  ctx.beginPath();
  ctx.font = "25px serif";
  ctx.fillStyle = "blue";
  ctx.fillText(`Time: ${time}`, cameraX + 480, cameraY);
  ctx.fill();
  
  ctx.closePath();
}

function drawScore() {
  ctx.beginPath();
  ctx.font = "25px serif";
  ctx.fillStyle = "blue";
  ctx.fillText(`Score: ${player.score}`, cameraX, cameraY + 25);
  ctx.fill();
  
  ctx.closePath();
}