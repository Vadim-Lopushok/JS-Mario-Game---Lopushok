import { c, canvas, gravity } from '../game.js'

class Particle {
  constructor({ position, velocity, radius, color = '#654428', fireball = false, fades = false, }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.radius = radius;
    this.ttl = 300;
    this.color = color;
    this.fireball = fireball;
    this.opacity = 1;
    this.fades = fades;
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.ttl--;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.radius + this.velocity.y <= canvas.height)
      this.velocity.y += gravity * 0.4;

    if (this.fades && this.opacity > 0) {
      this.opacity -= 0.01;
    }

    if (this.opacity < 0) this.opacity = 0;
  }
}

export { Particle }