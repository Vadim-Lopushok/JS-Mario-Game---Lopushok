import { images } from '../images/images'

class Player {
  constructor() {
    this.shooting = false;
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.scale = 0.3;
    this.width = 398 * this.scale;
    this.height = 353 * this.scale;
    /*this.image = spriteStandRight;*/
    this.frames = 0;
    this.sprites = {
      stand: {
        right: images.mario.stand.right,
        left: images.mario.stand.left,
        fireFlower: {
          right: images.mario.fireFlower.stand.right,
          left: images.mario.fireFlower.stand.left,
        },
      },
      run: {
        right: images.mario.run.right,
        left: images.mario.run.left,
        fireFlower: {
          right: images.mario.fireFlower.run.right,
          left: images.mario.fireFlower.run.left,
        },
      },
      jump: {
        right: images.mario.jump.right,
        left: images.mario.jump.left,
        fireFlower: {
          right: images.mario.fireFlower.jump.right,
          left: images.mario.fireFlower.jump.left,
        },
      },
      shoot: {
        fireFlower: {
          right: images.mario.shoot.fireFlower.right,
          left: images.mario.shoot.fireFlower.left,
        },
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 398;
    this.powerUps = {
      fireFlower: false,
    };
    this.invincible = false;
    this.opacity = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = 'rgba(255, 0, 0, 0)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0,
      this.currentCropWidth, 353, this.position.x, this.position.y,
      this.width, this.height);
    c.restore();
  }

  update() {
    this.frames++;
    const {currentSprite, sprites} = this;

    if (this.frames > 58 &&
      (currentSprite === sprites.stand.right || currentSprite ===
        sprites.stand.left || currentSprite ===
        sprites.stand.fireFlower.left || currentSprite ===
        sprites.stand.fireFlower.right)) this.frames = 0;
    else if (this.frames > 28 &&
      (currentSprite === sprites.run.right || currentSprite ===
        sprites.run.left || currentSprite ===
        sprites.run.fireFlower.right || currentSprite ===
        sprites.run.fireFlower.left)) this.frames = 0;
    else if (currentSprite === sprites.jump.right || currentSprite ===
      sprites.jump.left || currentSprite === sprites.jump.fireFlower.right ||
      currentSprite === sprites.jump.fireFlower.left || currentSprite ===
      sprites.shoot.fireFlower.left || currentSprite ===
      sprites.shoot.fireFlower.right) this.frames = 0;

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;

    if (this.invincible) {
      if (this.opacity === 1) this.opacity = 0;
      else this.opacity = 1;
    } else this.opacity = 1;
  }
}

export { Player };