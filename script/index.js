import {
  collisionTop,
  isOnTopPlatformCircle,
  isOnTopPlatform,
  hitBottomOfPlatform,
  hitSideOfPlatform,
  objectsTouch
} from './utils.js'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let platform = new Image();
platform.src = '../sprites/platform.png';
let hills = new Image();
hills.src = '../sprites/hills.png';
let background = new Image();
background.src = '../sprites/background.png';
let platformSmallTall = new Image();
platformSmallTall.src = '../sprites/platformSmallTall.png'
let block = new Image();
block.src = '../sprites/block.png'
let blockTri = new Image();
blockTri.src = '../sprites/blockTri.png'

let lgPlatform = new Image();
lgPlatform.src = '../sprites/lgPlatform.png'
let mdPlatform = new Image();
mdPlatform.src = '../sprites/mdPlatform.png'
let tPlatform = new Image();
tPlatform.src = '../sprites/tPlatform.png'
let xtPlatform = new Image();
xtPlatform.src = '../sprites/xtPlatform.png'

let spriteRunLeft = new Image();
spriteRunLeft.src = '../sprites/spriteMarioRunLeft.png'
let spriteRunRight = new Image();
spriteRunRight.src = '../sprites/spriteMarioRunRight.png'
let spriteStandLeft = new Image();
spriteStandLeft.src = '../sprites/spriteMarioStandLeft.png'
let spriteStandRight = new Image();
spriteStandRight.src = '../sprites/spriteMarioStandRight.png'
let spriteMarioJumpLeft = new Image();
spriteMarioJumpLeft.src = '../sprites/spriteMarioJumpLeft.png'
let spriteMarioJumpRight = new Image();
spriteMarioJumpRight.src = '../sprites/spriteMarioJumpRight.png'
let spriteGoomba = new Image();
spriteGoomba.src = '../sprites/spriteGoomba.png'

let fireFlower = new Image();
fireFlower.src = '../sprites/spriteFireFlower.png'
let fireFlowerStandLeft = new Image();
fireFlowerStandLeft.src = '../sprites/spriteFireFlowerStandLeft.png'
let fireFlowerStandRight = new Image();
fireFlowerStandRight.src = '../sprites/spriteFireFlowerStandRight.png'
let fireFlowerRunRight = new Image();
fireFlowerRunRight.src = '../sprites/spriteFireFlowerRunRight.png'
let fireFlowerRunLeft = new Image();
fireFlowerRunLeft.src = '../sprites/spriteFireFlowerRunLeft.png'
let fireFlowerJumpLeft = new Image();
fireFlowerJumpLeft.src = '../sprites/spriteFireFlowerJumpLeft.png'
let fireFlowerJumpRight = new Image();
fireFlowerJumpRight.src = '../sprites/spriteFireFlowerJumpRight.png'

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
        fireFlower: {
          right: fireFlowerStandRight,
          left: fireFlowerStandLeft
        }
      },
      run: {
        right: spriteRunRight,
        left: spriteRunLeft,
        fireFlower: {
          right: fireFlowerRunRight,
          left: fireFlowerRunLeft
        },
      },
      jump: {
        right: spriteMarioJumpRight,
        left: spriteMarioJumpLeft,
        fireFlower: {
          right: fireFlowerJumpRight,
          left: fireFlowerJumpLeft
        },
      }
    }
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 398;
    this.powerUps = {
      fireFlower: false
    }
    this.invincible = false
    this.opacity = 1
  }

  draw() {
    c.save()
    c.globalAlpha = this.opacity
    c.fillStyle = 'rgba(255, 0, 0, .2)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 353, this.position.x, this.position.y, this.width, this.height)
    c.restore()
  }

  update() {
    this.frames++
    const {currentSprite, sprites} = this

    if (this.frames > 58 && (currentSprite === sprites.stand.right || currentSprite === sprites.stand.left || currentSprite === sprites.stand.fireFlower.left || currentSprite === sprites.stand.fireFlower.right)) this.frames = 0
    else if (this.frames > 28 && (currentSprite === sprites.run.right || currentSprite === sprites.run.left || currentSprite === sprites.run.fireFlower.right || currentSprite === sprites.run.fireFlower.left)) this.frames = 0
    else if (currentSprite === sprites.jump.right || currentSprite === sprites.jump.left || currentSprite === sprites.jump.fireFlower.right || currentSprite === sprites.jump.fireFlower.left) this.frames = 0

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity

    if (this.invincible) {
      if (this.opacity === 1) this.opacity = 0
      else this.opacity = 1
    } else this.opacity = 1
  }
}

class Platform {
  constructor({x, y, image, block, text}) {
    this.position = {
      x,
      y
    }
    this.velocity = {
      x: 0
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.block = block
    this.text = text
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)

    if (this.text) {
      c.font = '20px Arial'
      c.fillStyle = 'red'
      c.fillText(this.text, this.position.x, this.position.y)
    }
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
  }
}

class GenericObject {
  constructor({x, y, image}) {
    this.position = {
      x,
      y
    }
    this.velocity = {
      x: 0
    }
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
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

class FireFlower {
  constructor({position, velocity}) {
    this.position = {
      x: position.x,
      y: position.y
    }

    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }

    this.width = 56
    this.height = 60
    this.image = fireFlower
    this.frames = 0
  }

  draw() {
    /*c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)*/

    c.drawImage(this.image, this.width * this.frames, 0, 56, 60, this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.frames++
    if (this.frames >= 75) this.frames = 0
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
  }
}

class Particle {
  constructor({position, velocity, radius, color = '#654428', fireball = false}) {
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
    this.color = color
    this.fireball = fireball
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
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

let player = new Player();
let platforms = [];
let genericObjects = [];
let particles = [];
let fireFlowers = [];
let lgPlatformImage;

const goombaWidth = 43.33;
let goombas = [
  new Goomba({
    position: {
      x: 908 + lgPlatform.width - goombaWidth,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 400,
      traveled: 0
    }
  }),
  new Goomba({
    position: {
      x: 3249 + lgPlatform.width - goombaWidth - goombaWidth,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 400,
      traveled: 0
    }
  }),
  new Goomba({
    position: {
      x: 3249 + lgPlatform.width - goombaWidth - goombaWidth - goombaWidth,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 400,
      traveled: 0
    }
  }),
  new Goomba({
    position: {
      x: 3249 + lgPlatform.width - goombaWidth - goombaWidth - goombaWidth - goombaWidth,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 400,
      traveled: 0
    }
  }),
  new Goomba({
    position: {
      x: 3249 + lgPlatform.width - goombaWidth - goombaWidth - goombaWidth - goombaWidth - goombaWidth,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 400,
      traveled: 0
    }
  }),
  new Goomba({
    position: {
      x: 5135 + xtPlatform.width / 2 + goombaWidth,
      y: 100
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 100,
      traveled: 0
    }
  }),
  new Goomba({
    position: {
      x: 6968,
      y: 0
    },
    velocity: {
      x: -0.3,
      y: 0
    },
    distance: {
      limit: 100,
      traveled: 0
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

async function init() {
  fireFlowers = [
    new FireFlower({
      position: {
        x: 400,
        y: 100
      },
      velocity: {
        x: 0,
        y: 0
      }
    })
  ]

  player = new Player();
  particles = [];
  platforms = [
    new Platform({
      x: 908 + 100,
      y: 300,
      image: blockTri,
      block: true
    }),
    new Platform({
      x: 908 + 100 + block.width,
      y: 100,
      image: block,
      block: true
    }),
    new Platform({
      x: 1991 + lgPlatform.width - tPlatform.width,
      y: canvas.height - lgPlatform.height - tPlatform.height,
      image: tPlatform,
      block: false
    }),
    new Platform({
      x: 1991 + lgPlatform.width - tPlatform.width - 100,
      y: canvas.height - lgPlatform.height - tPlatform.height + block.height,
      image: block,
      block: true
    }),
    new Platform({
      x: 5712 + xtPlatform.width + 175,
      y: canvas.height - xtPlatform.height,
      image: block,
      block: true
    }),
    new Platform({
      x: 5712 + xtPlatform.width + 175 * 2,
      y: canvas.height - xtPlatform.height,
      image: block,
      block: true,
    }),
    new Platform({
      x: 6116 + 175,
      y: canvas.height - xtPlatform.height,
      image: block,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 2,
      y: canvas.height - xtPlatform.height,
      image: block,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 3,
      y: canvas.height - xtPlatform.height - 100,
      image: block,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 4,
      y: canvas.height - xtPlatform.height - 200,
      image: blockTri,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 4 + blockTri.width,
      y: canvas.height - xtPlatform.height - 200,
      image: blockTri,
      block: true,
    }),
    new Platform({
      x: 6968 + 300,
      y: canvas.height - lgPlatform.height,
      image: lgPlatform,
      block: true,
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

  const platformsMap = ['lg', 'lg', 'gap', 'lg', 'gap', 'gap', 'lg', 'gap', 't', 'gap', 'xt', 'gap', 'xt', 'gap', 'gap', 'xt'];

  let platformDistance = 0;

  platformsMap.forEach(symbol => {
    switch (symbol) {
      case 'lg':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - lgPlatform.height,
          image: lgPlatform,
          block: true,
          text: platformDistance
        }))
        platformDistance += lgPlatform.width - 2
        break;

      case 'gap':
        platformDistance += 175
        break;

      case 't':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - tPlatform.height,
          image: tPlatform,
          block: true
        }))
        platformDistance += tPlatform.width - 2
        break;

      case 'xt':
        platforms.push(new Platform({
          x: platformDistance,
          y: canvas.height - xtPlatform.height,
          image: xtPlatform,
          block: true,
          text: platformDistance
        }))
        platformDistance += xtPlatform.width - 2
        break;
    }
  })
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach(GenericObject => {
    GenericObject.update();
    GenericObject.velocity.x = 0;
  })

  platforms.forEach(platform => {
    platform.update();
    platform.velocity.x = 0;
  })

  //mario obtains power up
  fireFlowers.forEach((fireFlower, i) => {
    if (objectsTouch({
      object1: player,
      object2: fireFlower
    })) {
      player.powerUps.fireFlower = true
      setTimeout(() => {
        fireFlowers.splice(i, 1)
      }, 0)
    } else fireFlower.update()
  })

  goombas.forEach((goomba, index) => {
    goomba.update();

    // remove goomba on fireball hit
    particles.filter(particle => particle.fireball).forEach((particle, particleIndex) => {
      if (particle.position.x + particle.radius >= goomba.position.x && particle.position.y + particle.radius >= goomba.position.y && particle.position.x - particle.radius <= goomba.position.x + goomba.width && particle.position.y - particle.radius <= goomba.position.y + goomba.height) {
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
        setTimeout(() => {
          goombas.splice(index, 1)
          particles.splice(particleIndex, 1)
        }, 0)
      }
    })

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
    ) {
      //player hits goomba
      if (player.powerUps.fireFlower) {
        player.invincible = true
        player.powerUps.fireFlower = false

        setTimeout(() => {
          player.invincible = false
        }, 1000)
      } else if (!player.invincible) init();
    }
  })
  particles.forEach((particle, i) => {
    particle.update();

    if (particle.fireball && (particle.position.x - particle.radius >= canvas.width || particle.position.x + particle.radius <= 0))
      setTimeout(() => {
        particles.splice(i, 1)
      }, 0)
  })
  player.update();

  let hitSide = false

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    //scrolling code
    if (keys.right.pressed) {
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        platform.velocity.x = -player.speed
        if (platform.block && hitSideOfPlatform({
          object: player,
          platform
        })) {
          platforms.forEach((platform) => {
            platform.velocity.x = 0
          })
          hitSide = true
          break
        }
      }

      if (!hitSide) {
        scrollOffset += player.speed

        genericObjects.forEach((GenericObject) => {
          GenericObject.velocity.x = -player.speed * 0.66
        })
        goombas.forEach((goomba) => {
          goomba.position.x -= player.speed
        })
        fireFlowers.forEach((fireFlower) => {
          fireFlower.position.x -= player.speed
        })
        particles.forEach((particle) => {
          particle.position.x -= player.speed
        })
      }
    } else if (keys.left.pressed && scrollOffset > 0) {
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        platform.velocity.x = player.speed

        if (platform.block && hitSideOfPlatform({
          object: player,
          platform
        })) {
          platforms.forEach((platform) => {
            platform.velocity.x = 0
          })
          hitSide = true
          break
        }
      }

      if (!hitSide) {
        scrollOffset -= player.speed
        genericObjects.forEach((GenericObject) => {
          GenericObject.velocity.x = player.speed * .66
        })
        goombas.forEach((goomba) => {
          goomba.position.x += player.speed
        })
        fireFlowers.forEach((fireFlower) => {
          fireFlower.position.x += player.speed
        })
        particles.forEach((particle) => {
          particle.position.x += player.speed
        })
      }
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
        const bounce = 0.9
        particle.velocity.y = -particle.velocity.y * .99
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

    fireFlowers.forEach((fireFlower) => {
      if (isOnTopPlatform({
        object: fireFlower,
        platform
      })) fireFlower.velocity.y = 0
    })
  })

  // win condition
  if (platform && scrollOffset + 400 + player.width > 6968 + 300) {
    console.log('you win');
  }

  // lose condition
  if (player.position.y > canvas.height) {
    init();
  }

  // sprite Switch
  if (player.velocity.y !== 0) return

  if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
    player.currentSprite = player.sprites.run.right;
  } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
    player.currentSprite = player.sprites.run.left;
  } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
    player.currentSprite = player.sprites.stand.left;
  } else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
    player.currentSprite = player.sprites.stand.right;
  }

  // fireflower sprites
  if (!player.powerUps.fireFlower) return
  if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.fireFlower.right) {
    player.currentSprite = player.sprites.run.fireFlower.right;
  } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.fireFlower.left) {
    player.currentSprite = player.sprites.run.fireFlower.left;
  } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.fireFlower.left) {
    player.currentSprite = player.sprites.stand.fireFlower.left;
  } else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.fireFlower.right) {
    player.currentSprite = player.sprites.stand.fireFlower.right;
  }
}

init();
animate();

window.addEventListener('keydown', ({keyCode}) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      lastKey = 'left';
      break;

    case 83:
      break;

    case 68:
      keys.right.pressed = true;
      lastKey = 'right';
      break;

    case 87:
      player.velocity.y -= 25;
      if (lastKey === 'right')
        player.currentSprite = player.sprites.jump.right;
      else player.currentSprite = player.sprites.jump.left;

      if (!player.powerUps.fireFlower) break
      if (lastKey === 'right')
        player.currentSprite = player.sprites.jump.fireFlower.right;
      else player.currentSprite = player.sprites.jump.fireFlower.left;
      break;

    case 32:
      console.log('space')

      if (!player.powerUps.fireFlower) return

      let velocity = 15
      if (lastKey === 'left') velocity = -velocity
      particles.push(new Particle({
        position: {
          x: player.position.x + player.width / 2,
          y: player.position.y + player.height / 2
        },
        velocity: {
          x: velocity,
          y: 0
        },
        radius: 5,
        color: 'red',
        fireball: true
      }))
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