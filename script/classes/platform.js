class Platform {
  constructor({x, y, image, block, text}) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.block = block;
    this.text = text;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);

    if (this.text) {
      c.font = '20px Arial';
      c.fillStyle = 'red';
      c.fillText(this.text, this.position.x, this.position.y);
    }
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

export { Platform };