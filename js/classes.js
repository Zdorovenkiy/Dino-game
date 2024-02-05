class Sprite {
  constructor({x, y, imageSrc, frameRate, animation}) {
    this.x = x;
    this.y = y;
    this.image = new Image()
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / frameRate;
      this.height = this.image.height;
      console.log(this.width)
      console.log(this.height)
    }
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrame = 0;
    this.frameBuffer = 8;
    this.animation = animation;
    console.log(this.frameRate)

    if (this.animation) {
      for (let key in this.animation) {
        const image = new Image()
        image.src = this.animation[key].imageSrc
        this.animation[key].image = image
      }
    }

  }

    draw() {
      if (!this.loaded) return
      const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    }

    // ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.x,
      this.y,
      this.width,
      this.height,
      this.updateFrames()

    )}

    updateFrames() {
      this.elapsedFrame++;

      if (this.elapsedFrame === this.frameBuffer) {
        this.elapsedFrame = 0;

        if (this.currentFrame < this.frameRate - 1)
          this.currentFrame++;
        else
          this.currentFrame = 0;  
      }


    }
}

class Player extends Sprite {
  constructor(x, y, imageSrc, frameRate, animation) {
    super({imageSrc, frameRate, animation});
    this.x = x;
    this.y = y;
    this.health = 100;
    this.score = 0;
  }

  update() {
    this.draw();
    this.updateHitbox() 
  }

  switchSprite(name) {
    if (this.image === this.animation[name].image) return
    this.currentFrame = 0
    this.image = this.animation[name].image
    this.frameRate = this.animation[name].frameRate
    this.frameBuffer = this.animation[name].frameBuffer
    this.width = this.image.width / this.frameRate;
    this.height = this.image.height;
  }

    updateHitbox() {
    this.hitbox = {
      position: {
        x: this.x + 28,
        y: this.y + 14,
      },
      width: 23,
      height: 53,
    }
    // ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
  }
}


class Unit extends Sprite {
  constructor(x, y, imageSrc, frameRate, animation) {
    super({imageSrc, frameRate, animation});
    this.x = x;
    this.y = y;
    // this.width = width;
    // this.height = height;
    this.movement = 3;
  }
  // draw() {
  //   ctx.beginPath();
  //   ctx.rect(this.x, this.y, this.width, this.height);
  //   ctx.fillStyle = "black";
  //   ctx.fill();
  //   ctx.closePath();
  // }


  update() {
    this.draw();
    this.updateHitbox() 
  }

  switchSprite(name) {
    if (this.image === this.animation[name].image) return
    this.currentFrame = 0
    this.image = this.animation[name].image
    this.frameRate = this.animation[name].frameRate
    this.frameBuffer = this.animation[name].frameBuffer
    this.width = this.image.width / this.frameRate;
    this.height = this.image.height;
  }

    updateHitbox() {
    this.hitbox = {
      position: {
        x: this.x + 28,
        y: this.y + 14,
      },
      width: 23,
      height: 53,
    }
    // ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
  }

  move() {
    this.collisionCheck();
    this.x += this.movement;
  }

  collisionCheck() {
    objectArray.forEach((item) => {
        if (this.hitbox.position.x + this.hitbox.width + this.movement >= item.x &&
        this.hitbox.position.x + this.movement <= item.x + item.width &&
        this.hitbox.position.y + this.hitbox.height >= item.y &&
        this.hitbox.position.y <= item.y + item.height) { 
          if (this.movement > 0) {
            this.movement = -this.movement
            this.switchSprite("walkLeft")
          } else {
            this.movement = Math.abs(this.movement);
            this.switchSprite("walkRight")
          }
        }
    })
  }
}

class Coin {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.enable = true;
    this.type = type;
  }

  draw() {
    let left = this.x;
    let top = this.y;
    let type = this.type;
    fabric.Image.fromURL(urlCoin, oImg => {
      oImg.left = left;
      oImg.top = top;
      oImg.type = type;
      fcanvas.add(oImg); 
    });
  }

  collisionCheck() {
    if (player.x + player.width >= this.x &&
        player.x <= this.x + this.width &&
        player.y + player.height >= this.y &&
        player.y <= this.y) { 
          this.enable = false;
          player.score += 100;
          let c = fcanvas.getObjects(this.type);
          fcanvas.remove(c[0]);
    }
  }
  update() {
    if (this.enable) {
      this.collisionCheck();
    }
  }
}

class CollisionBlock {
  constructor(x, y, width = 16, height = 16 ) {
    this.x = x;
    this.y = y;
    this.width = width
    this.height = height
  }

  draw() {
    let left = this.x;
    let top = this.y;
    fabric.Image.fromURL(urlFloor, function(oImg) {
      oImg.left = left;
      oImg.top = top;
      fcanvas.add(oImg);
    });
  }
}