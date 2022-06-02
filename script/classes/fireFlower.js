import { images } from '../images/images'

class FireFlower {
  constructor({position, velocity}) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 56;
    this.height = 60;
    this.image = images.mario.fireFlower.stand.face;
    this.frames = 0;
  }

  draw() {
    c.drawImage(this.image, this.width * this.frames, 0, 56, 60,
      this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.frames++;
    if (this.frames >= 75) this.frames = 0;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

export { FireFlower };