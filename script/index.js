'use strict'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5;

class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100
    };
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 66;
    this.height = 150;
    this.image = spriteStandRight;
    this.frames = 0;
    this.sprites = {
      stand: {
        right: spriteStandRight,
        left: spriteStandLeft,
        cropWidth: 177,
        width: 66
      },
      run: {
        right: spriteRunRight,
        left: spriteRunLeft,
        cropWidth: 341,
        width: 127.875
      }
    }
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }

  draw() {
    c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.frames++

    if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) this.frames = 0
    else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) this.frames = 0

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
  }
}

class Platform {
  constructor({x, y, image}) {
    this.position = {
      x,
      y
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({x, y, image}) {
    this.position = {
      x,
      y
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

let platform = new Image();
platform.src = './sprites/platform.png';

let hills = new Image();
hills.src = './sprites/hills.png';

let background = new Image();
background.src = './sprites/background.png';

let platformSmallTall = new Image();
platformSmallTall.src = './sprites/platformSmallTall.png'

let spriteRunLeft = new Image();
spriteRunLeft.src = './sprites/spriteRunLeft.png'

let spriteRunRight = new Image();
spriteRunRight.src = './sprites/spriteRunRight.png'

let spriteStandLeft = new Image();
spriteStandLeft.src = './sprites/spriteStandLeft.png'

let spriteStandRight = new Image();
spriteStandRight.src = './sprites/spriteStandRight.png'

let player = new Player();

let platforms = [];

let genericObjects = [];

let  lastKey;
let keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

function init() {
  platform = new Image();
  platform.src = './sprites/platform.png';

  hills = new Image();
  hills.src = './sprites/hills.png';

  background = new Image();
  background.src = './sprites/background.png';

  player = new Player();

  platforms = [
    new Platform({
      x: platform.width * 4 + 300 - 2 + platform.width - platformSmallTall.width, y: 270, image: platformSmallTall
    }),
    new Platform({
      x: -1, y: 470, image: platform
    }), new Platform({
      x: platform.width - 3, y: 470, image: platform
    }),
    new Platform({
      x: platform.width * 2 + 100, y: 470, image: platform
    }),
    new Platform({
      x: platform.width * 3 + 300, y: 470, image: platform
    }),
    new Platform({
      x: platform.width * 4 + 300 - 2, y: 470, image: platform
    }),
    new Platform({
      x: platform.width * 5 + 700 - 2, y: 470, image: platform
    })
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: background
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: hills
    })
  ]

  keys = {
    right: {
      pressed: false
    },
    left: {
      pressed: false
    }
  }

  scrollOffset = 0
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach(GenericObject => {
    GenericObject.draw()
  })

  platforms.forEach(platform => {
    platform.draw();
  })
  player.update()

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach(platform => {
        platform.position.x -= player.speed
      })
      genericObjects.forEach(GenericObject => {
        GenericObject.position.x -= player.speed * .66
      })
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed
      platforms.forEach(platform => {
        platform.position.x += player.speed
      })
      genericObjects.forEach(GenericObject => {
        GenericObject.position.x += player.speed * .66
      })
    }
  }

  // Platform collision
  platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0
    }
  })

  // sprite Switch
  if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
    player.frames = 1
    player.currentSprite = player.sprites.run.right
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  } else  if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
    player.currentSprite = player.sprites.run.left
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
  } else  if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
    player.currentSprite = player.sprites.stand.left
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  } else  if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
    player.currentSprite = player.sprites.stand.right
    player.currentCropWidth = player.sprites.stand.cropWidth
    player.width = player.sprites.stand.width
  }

  // win condition
  if (scrollOffset > platform.width * 5 + 300 - 2) {
    console.log('you win');
  }

  // lose condition
  if (player.position.y > canvas.height) {
    init();
  }
}

init();
animate();

window.addEventListener('keydown', ({keyCode}) => {
  switch (keyCode) {
    case 65:
      console.log('left');
      keys.left.pressed = true
      lastKey = 'left'
      break;

    case 83:
      console.log('down');
      break;

    case 68:
      console.log('right');
      keys.right.pressed = true
      lastKey = 'right'
      break;

    case 87:
      console.log('up');
      player.velocity.y -= 25;
      break;
  }
})

window.addEventListener('keyup', ({keyCode}) => {
  switch (keyCode) {
    case 65:
      console.log('left');
      keys.left.pressed = false;
      break;

    case 83:
      console.log('down');
      break;

    case 68:
      console.log('right');
      keys.right.pressed = false;
      break;

    case 87:
      console.log('up');
      player.velocity.y = 0;
      break;
  }
})