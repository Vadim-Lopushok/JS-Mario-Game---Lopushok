import { images } from '../images/images.js'
import { ctx, canvas, gravity } from '../game.js'

class Goomba {
  constructor({
    position, velocity, distance = {
      limit: 50,
      traveled: 0,
    },
  }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 43.33;
    this.height = 50;
    this.image = images.goomba.spriteGoomba;
    this.frames = 0;
    this.distance = distance;
  }

  draw() {
    ctx.drawImage(this.image, 130 * this.frames, 0, 130, 150, this.position.x,
      this.position.y, this.width, this.height);
  }

  update() {
    this.frames++;
    if (this.frames >= 58) this.frames = 0;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;

    //walk the goomba back and forth
    this.distance.traveled += Math.abs(this.velocity.x);

    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0;
      this.velocity.x = -this.velocity.x;
    }
  }
}

export { Goomba };