function collisionDetection() {
  objectArray.forEach((item) => {
    if (player.hitbox.position.x + player.hitbox.width > item.x &&
        player.hitbox.position.x < item.x + item.width &&
        player.hitbox.position.y + player.hitbox.height + gravitySpeed + 1 >= item.y &&
        player.hitbox.position.y + player.hitbox.height <= item.y + item.height) { 
          player.hitbox.position.y = item.y - player.hitbox.height - 1;
          gravitySpeed = 0;  
          //console.log(gravitySpeed)  
    }

    if (player.hitbox.position.x + player.hitbox.width + movement >= item.x &&
        player.hitbox.position.x - movement <= item.x + item.width &&
        player.hitbox.position.y + player.hitbox.height - gravitySpeed > item.y &&
        player.hitbox.position.y <= item.y + item.height) {
           //console.log(111);
          if (player.hitbox.position.x + player.hitbox.width > item.x &&
              player.hitbox.position.x < item.x + item.width &&
              Math.trunc(player.hitbox.position.y) <= item.y + item.height) {            
                player.hitbox.position.y = item.y + item.height;
                stop = true;
                //console.log(3);
          } else if (player.hitbox.position.x <= item.x) {  
                player.x = item.x - player.hitbox.width - 28 - movement;
                //console.log(1);
          } else if (player.hitbox.position.x >= item.x + item.width) {                         
                player.x = item.x + item.width + movement - 28;
                //player.x = item.x - player.hitbox.width - 33 - movement;
                //console.log(2)
          }  
    } 
  })

  unitArray.forEach(async (item) => {
    if (player.hitbox.position.x + player.hitbox.width >= item.x &&
        player.hitbox.position.x <= item.x + item.width &&
        Math.trunc(player.hitbox.position.y) + player.hitbox.height - 1 > item.y &&
        Math.trunc(player.hitbox.position.y) - 1 < item.y + item.height) {
          if (!invulnerable) {
            player.health -= 25; 
            await invulnerableTime();
          }    
    } 
  })
}
