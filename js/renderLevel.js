function drawLevel(levelStage) {

  for (let i = 0; i < levelStage.length; i += 75) {
    floorCollisions2D.push(levelStage.slice(i, i + 75))
  }

  floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === "f") {
        let obj = new CollisionBlock(x * 16, y * 16)
        collisionBlocks.push(obj);
        objectArray.push(obj);
        obj.draw();
      } else if (symbol === "p") {
          player = new Player(
            x * 16,
            y * 16 - paddleHeight,
            "./images/dinoSprite.png",
            4,
            animation = {
              idleRight: {
                frameRate: 4,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSprite.png",
              },
              idleLeft: {
                frameRate: 4,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteLeft.png",
              },
              walkRight: {
                frameRate: 4,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteWalk.png",
              },
              walkLeft: {
                frameRate: 4,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteWalkLeft.png",
              },
              jumpRight: {
                frameRate: 5,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteJump.png",
              },
              jumpLeft: {
                frameRate: 5,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteJumpleft.png",
              },
              fallRight: {
                frameRate: 5,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteFall.png",
              },
              fallLeft: {
                frameRate: 5,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteFallleft.png",
              },
          });
        //collisionBlocks.push(obj);
      } else if (symbol === "e") {
        let enemy = new Unit(
          x * 16,
          y * 16 - paddleHeight,
          "./images/dinoSpriteWalk.png",
          4,
          animation = {
              walkRight: {
                frameRate: 4,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteWalk.png",
              },
              walkLeft: {
                frameRate: 4,
                frameBuffer: 8,
                loop: true,
                imageSrc: "./images/dinoSpriteWalkLeft.png",
              },
          });
        unitArray.push(enemy);
      } else if (symbol === "c") {
        let coin = new Coin(x * 16, y * 16, `coin${x}${y}`);
        coinArray.push(coin);
        coin.draw();
      }
    })
  })  
}
