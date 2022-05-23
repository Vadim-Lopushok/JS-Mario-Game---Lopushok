import {createImage, createImageAsync, collisionTop, isOnTopPlatformCircle, isOnTopPlatform, hitBottomOfPlatform, hitSideOfPlatform} from './utils.js'

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
    this.scale = 0.3
    this.width = 398 * this.scale;
    this.height = 353 * this.scale;
    this.image = spriteStandRight;
    this.frames = 0;
    this.sprites = {
      stand: {
        right: spriteStandRight,
        left: spriteStandLeft,
        cropWidth: 398,
        width: 398 * this.scale
      },
      run: {
        right: spriteRunRight,
        left: spriteRunLeft,
        cropWidth: 398,
        width: 398 * this.scale
      },
      jump: {
        right: spriteMarioJumpRight,
        left: spriteMarioJumpLeft,
        cropWidth: 398,
        width: 398 * this.scale
      }
    }
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = this.sprites.stand.cropWidth;
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, .2)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 353, this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.frames++

    if (this.frames > 58 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) this.frames = 0
    else if (this.frames > 28 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) this.frames = 0
    else if (this.currentSprite === this.sprites.jump.right || this.currentSprite === this.sprites.jump.left) this.frames = 0

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
  }
}

class Platform {
  constructor({x, y, image, block}) {
    this.position = {
      x,
      y
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.block = block
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

class Goomba {
  constructor({
                position, velocity, distance = {
      limit: 50,
      traveled: 0
    }
              }) {
    this.position = {
      x: position.x,
      y: position.y
    }

    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }

    this.width = 43.33
    this.height = 50
    this.image = spriteGoomba
    this.frames = 0
    this.distance = distance
  }

  draw() {
    /*c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)*/

    c.drawImage(this.image, 130 * this.frames, 0, 130, 150, this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.frames++
    if (this.frames >= 58) this.frames = 0
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity

    //walk the goomba back and forth
    this.distance.traveled += Math.abs(this.velocity.x)

    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0
      this.velocity.x = -this.velocity.x
    }
  }
}

class Particle {
  constructor({position, velocity, radius}) {
    this.position = {
      x: position.x,
      y: position.y
    }
    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }
    this.radius = radius
    this.ttl = 300
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = '#654428'
    c.fill()
    c.closePath()
  }

  update() {
    this.ttl--
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.radius + this.velocity.y <= canvas.height)
      this.velocity.y += gravity * 0.4
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
spriteRunLeft.src = './sprites/spriteMarioRunLeft.png'

let spriteRunRight = new Image();
spriteRunRight.src = './sprites/spriteMarioRunRight.png'

let spriteStandLeft = new Image();
spriteStandLeft.src = './sprites/spriteMarioStandLeft.png'

let spriteStandRight = new Image();
spriteStandRight.src = './sprites/spriteMarioStandRight.png'

let spriteMarioJumpLeft = new Image();
spriteMarioJumpLeft.src = './sprites/spriteMarioJumpLeft.png'

let spriteMarioJumpRight = new Image();
spriteMarioJumpRight.src = './sprites/spriteMarioJumpRight.png'

let spriteGoomba = new Image();
spriteGoomba.src = './sprites/spriteGoomba.png'

let block = new Image();
block.src = './sprites/block.png'

let blockTri = new Image();
blockTri.src = './sprites/blockTri.png'

let player = new Player();
let platforms = [];
let genericObjects = [];
let particles = []

let goombas = [
  new Goomba({
    position: {
      x: 800,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 200,
      traveled: 0
    }
  }),
  new Goomba({
    position: {
      x: 1400,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    }
  })
];

let lastKey;
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

  particles = []

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
    }),
    new Platform({
      x: 300, y: 300, image: blockTri, block: true
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

  goombas.forEach((goomba, index) => {
    goomba.update()

    //goomba stomp squish
    if (collisionTop({
      object1: player,
      object2: goomba
    })) {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle({
          position: {
            x: goomba.position.x + goomba.width / 2,
            y: goomba.position.y + goomba.height / 2
          },
          velocity: {
            x: (Math.random() - 0.5) * 7,
            y: (Math.random() - 0.5) * 15
          },
          radius: Math.random() * 3
        }))
      }
      player.velocity.y -= 40
      setTimeout(() => {
        goombas.splice(index, 1)
      }, 0)
    } else if (
      player.position.x + player.width >= goomba.position.x && player.position.y + player.height >= goomba.position.y && player.position.x <= goomba.position.x + goomba.width
    ) init()
  })
  particles.forEach(particle => {
    particle.update()
  })
  player.update()

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    //scrolling code
    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach(platform => {
        platform.position.x -= player.speed
      })
      genericObjects.forEach(GenericObject => {
        GenericObject.position.x -= player.speed * .66
      })
      goombas.forEach((goomba) => {
        goomba.position.x -= player.speed
      })
      particles.forEach((particle) => {
        particle.position.x -= player.speed
      })
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed
      platforms.forEach(platform => {
        platform.position.x += player.speed
      })
      genericObjects.forEach(GenericObject => {
        GenericObject.position.x += player.speed * .66
      })
      goombas.forEach((goomba) => {
        goomba.position.x += player.speed
      })
      particles.forEach((particle) => {
        particle.position.x += player.speed
      })
    }
  }

  // Platform collision detection
  platforms.forEach(platform => {
    if (isOnTopPlatform({
      object: player,
      platform
    })) {
      player.velocity.y = 0
    }

    if (platform.block && hitBottomOfPlatform({
      object: player,
      platform
    })) {
      player.velocity.y = -player.velocity.y
    }

    if (platform.block && hitSideOfPlatform({
      object: player,
      platform
    })) {
      player.velocity.x = 0
    }

    //particles bounce
    particles.forEach((particle, index) => {
      if (isOnTopPlatformCircle({
        object: particle,
        platform
      })) {
        particle.velocity.y = -particle.velocity.y * 0.9
        if (particle.radius - 0.4 < 0) particles.splice(index, 1)
        else particle.radius -= 0.4
      }
      if (particle.ttl < 0) particles.splice(index, 1)
    })
    goombas.forEach((goomba) => {
      if (isOnTopPlatform({
        object: goomba,
        platform
      })) goomba.velocity.y = 0
    })
  })

  // sprite Switch
  if (player.velocity.y === 0) {

    if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
      player.frames = 1
      player.currentSprite = player.sprites.run.right
      player.currentCropWidth = player.sprites.run.cropWidth
      player.width = player.sprites.run.width
    } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
      player.currentSprite = player.sprites.run.left
      player.currentCropWidth = player.sprites.run.cropWidth
      player.width = player.sprites.run.width
    } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
      player.currentSprite = player.sprites.stand.left
      player.currentCropWidth = player.sprites.stand.cropWidth
      player.width = player.sprites.stand.width
    } else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
      player.currentSprite = player.sprites.stand.right
      player.currentCropWidth = player.sprites.stand.cropWidth
      player.width = player.sprites.stand.width
    }
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
      keys.left.pressed = true
      lastKey = 'left'
      break;

    case 83:
      break;

    case 68:
      keys.right.pressed = true
      lastKey = 'right'
      break;

    case 87:
      player.velocity.y -= 25;
      if (lastKey === 'right')
        player.currentSprite = player.sprites.jump.right
      else player.currentSprite = player.sprites.jump.left
      break;
  }
})

window.addEventListener('keyup', ({keyCode}) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;

    case 83:
      console.log('down');
      break;

    case 68:
      keys.right.pressed = false;
      break;

    case 87:
      player.velocity.y = 0;
      break;
  }
})