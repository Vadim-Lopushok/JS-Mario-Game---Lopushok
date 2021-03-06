import { Player } from './classes/player.js'
import { GenericObject } from './classes/genericObject.js'
import { Platform } from './classes/platform.js'
import { Particle } from './classes/particle.js'
import { Goomba } from './classes/goomba.js'
import { FireFlower } from './classes/fireFlower.js'
import { audio } from './audio/audio.js'
import { images } from './images/images.js'
import {
  collisionTop, hitBottomOfPlatform,
  hitSideOfPlatform,
  isOnTopPlatform, isOnTopPlatformCircle,
  objectsTouch,
} from './utils.js'

  export const canvas = document.getElementById('canvas');
  export const ctx = canvas.getContext('2d');

  canvas.width = 1024;
  canvas.height = 576;

  export let gravity = 1.5;
  let player = new Player();
  let platforms = [];
  let genericObjects = [];
  let particles = [];
  let fireFlowers = [];
  let goombas = [];

  let lastKey;
  let keys;
  let scrollOffset;
  let flagPole;
  let game;
  let currentLevel = 1;
  function selectLevel(currentLevel) {
    if (!audio.audioMusicLevel1.playing()) audio.audioMusicLevel1.play();
    switch (currentLevel) {
      case 1:
        init();
        break;
      case 2:
        initLevel2();
        break;
    }
  }

  function init() {
    player = new Player();
    keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
    };
    scrollOffset = 0;
    game = {
      disableUserInput: false,
    };
    flagPole = new GenericObject({
      x: 6968 + 600,
      y: canvas.height - images.levels['1'].lgPlatform.height - images.levels['1'].flagPoleSprite.height,
      image: images.levels['1'].flagPoleSprite,
    });

    fireFlowers = [
      new FireFlower({
        position: {
          x: 400,
          y: 100,
        },
        velocity: {
          x: 0,
          y: 0,
        },
      }),
    ];

    const goombaWidth = 43.33;
    goombas = [
      new Goomba({
        position: {
          x: 908 + images.levels['1'].lgPlatform.width - goombaWidth,
          y: 100,
        },
        velocity: {
          x: -0.3,
          y: 0,
        },
        distance: {
          limit: 400,
          traveled: 0,
        },
      }),
      new Goomba({
        position: {
          x: 3249 + images.levels['1'].lgPlatform - goombaWidth - goombaWidth,
          y: 100,
        },
        velocity: {
          x: -0.3,
          y: 0,
        },
        distance: {
          limit: 400,
          traveled: 0,
        },
      }),
      new Goomba({
        position: {
          x: 3249 + images.levels['1'].lgPlatform.width - goombaWidth - goombaWidth - goombaWidth,
          y: 100,
        },
        velocity: {
          x: -0.3,
          y: 0,
        },
        distance: {
          limit: 400,
          traveled: 0,
        },
      }),
      new Goomba({
        position: {
          x: 3249 + images.levels['1'].lgPlatform.width - goombaWidth - goombaWidth - goombaWidth -
            goombaWidth,
          y: 100,
        },
        velocity: {
          x: -0.3,
          y: 0,
        },
        distance: {
          limit: 400,
          traveled: 0,
        },
      }),
      new Goomba({
        position: {
          x: 3249 + images.levels['1'].lgPlatform.width - goombaWidth - goombaWidth - goombaWidth -
            goombaWidth - goombaWidth,
          y: 100,
        },
        velocity: {
          x: -0.3,
          y: 0,
        },
        distance: {
          limit: 400,
          traveled: 0,
        },
      }),
      new Goomba({
        position: {
          x: 5135 + images.levels['1'].xtPlatform.width / 2 + goombaWidth,
          y: 100,
        },
        velocity: {
          x: -0.3,
          y: 0,
        },
        distance: {
          limit: 100,
          traveled: 0,
        },
      }),
      new Goomba({
        position: {
          x: 6968,
          y: 0,
        },
        velocity: {
          x: -0.3,
          y: 0,
        },
        distance: {
          limit: 100,
          traveled: 0,
        },
      }),
    ];

    particles = [];
    platforms = [
      new Platform({
        x: 908 + 100,
        y: 300,
        image: images.levels['1'].blockTri,
        block: true,
      }),
      new Platform({
        x: 908 + 100 + images.levels['1'].block.width,
        y: 100,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 1991 + images.levels['1'].lgPlatform.width - images.levels['1'].tPlatform.width,
        y: canvas.height - images.levels['1'].lgPlatform.height - images.levels['1'].tPlatform.height,
        image: images.levels['1'].tPlatform,
        block: false,
      }),
      new Platform({
        x: 1991 + images.levels['1'].lgPlatform.width - images.levels['1'].tPlatform.width - 100,
        y: canvas.height - images.levels['1'].lgPlatform.height - images.levels['1'].tPlatform.height + images.levels['1'].block.height,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 5712 + images.levels['1'].xtPlatform.width + 175,
        y: canvas.height - images.levels['1'].xtPlatform.height,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 5712 + images.levels['1'].xtPlatform.width + 175 * 2,
        y: canvas.height - images.levels['1'].xtPlatform.height,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 6116 + 175,
        y: canvas.height - images.levels['1'].xtPlatform.height,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 6116 + 175 * 2,
        y: canvas.height - images.levels['1'].xtPlatform.height,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 6116 + 175 * 3,
        y: canvas.height - images.levels['1'].xtPlatform.height - 100,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 6116 + 175 * 4,
        y: canvas.height - images.levels['1'].xtPlatform.height - 200,
        image: images.levels['1'].blockTri,
        block: true,
      }),
      new Platform({
        x: 6116 + 175 * 4 + images.levels['1'].blockTri.width,
        y: canvas.height - images.levels['1'].xtPlatform.height - 200,
        image: images.levels['1'].blockTri,
        block: true,
      }),
      new Platform({
        x: 6968 + 300,
        y: canvas.height - images.levels['1'].lgPlatform.height,
        image: images.levels['1'].lgPlatform,
        block: true,
      }),
    ];

    genericObjects = [
      new GenericObject({
        x: -1,
        y: -1,
        image: images.levels['1'].background,
      }),
      new GenericObject({
        x: -1,
        y: -1,
        image: images.levels['1'].hills,
      }),
    ];

    keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
    };

    scrollOffset = 0;

    const platformsMap = [
      'lg',
      'lg',
      'gap',
      'lg',
      'gap',
      'gap',
      'lg',
      'gap',
      't',
      'gap',
      'xt',
      'gap',
      'xt',
      'gap',
      'gap',
      'xt'];

    let platformDistance = 0;

    platformsMap.forEach(symbol => {
      switch (symbol) {
        case 'lg':
          platforms.push(new Platform({
            x: platformDistance,
            y: canvas.height - images.levels['1'].lgPlatform.height,
            image: images.levels['1'].lgPlatform,
            block: true,
          }));
          platformDistance += images.levels['1'].lgPlatform.width - 2;
          break;

        case 'gap':
          platformDistance += 175;
          break;

        case 't':
          platforms.push(new Platform({
            x: platformDistance,
            y: canvas.height - images.levels['1'].tPlatform.height,
            image: images.levels['1'].tPlatform,
            block: true,
          }));
          platformDistance += images.levels['1'].tPlatform.width - 2;
          break;

        case 'xt':
          platforms.push(new Platform({
            x: platformDistance,
            y: canvas.height - images.levels['1'].xtPlatform.height,
            image: images.levels['1'].xtPlatform,
            block: true,
          }));
          platformDistance += images.levels['1'].xtPlatform.width - 2;
          break;
      }
    });
  }

  function initLevel2() {
    const mountains = images.levels['2'].mountains;
    const lgPlatform = images.levels['2'].lgPlatform;
    const mdPlatform = images.levels['2'].mdPlatform;

    player = new Player();

    keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
    };
    scrollOffset = 0;
    game = {
      disableUserInput: false,
    };

    flagPole = new GenericObject({
      x: 7680,
      y: canvas.height - lgPlatform.height - images.levels['1'].flagPoleSprite.height,
      image: images.levels['1'].flagPoleSprite,
    });

    fireFlowers = [
      new FireFlower({
        position: {
          x: 4734 - 28,
          y: 100,
        },
        velocity: {
          x: 0,
          y: 0,
        },
      }),
    ];

    const goombaWidth = 43.33;
    goombas = [
      new Goomba({
        // single block goomba
        position: {
          x: 903 + mdPlatform.width - goombaWidth,
          y: 100,
        },
        velocity: {
          x: -2,
          y: 0,
        },
        distance: {
          limit: 700,
          traveled: 0,
        },
      }),
      new Goomba({
        // single block goomba
        position: {
          x:
            1878 +
            lgPlatform.width +
            155 +
            200 +
            200 +
            200 +
            images.levels['1'].block.width / 2 -
            goombaWidth / 2,
          y: 100,
        },
        velocity: {
          x: 0,
          y: 0,
        },
        distance: {
          limit: 0,
          traveled: 0,
        },
      }),
      new Goomba({
        position: {
          x: 3831 + lgPlatform.width - goombaWidth,
          y: 100,
        },
        velocity: {
          x: -1,
          y: 0,
        },
        distance: {
          limit: lgPlatform.width - goombaWidth,
          traveled: 0,
        },
      }),

      new Goomba({
        position: {
          x: 4734,
          y: 100,
        },
        velocity: {
          x: 1,
          y: 0,
        },
        distance: {
          limit: lgPlatform.width - goombaWidth,
          traveled: 0,
        },
      }),
    ];
    particles = [];
    platforms = [
      new Platform({
        x: 903 + mdPlatform.width + 115,
        y: 300,
        image: images.levels['1'].blockTri,
        block: true,
      }),
      new Platform({
        x: 903 + mdPlatform.width + 115 + images.levels['1'].blockTri.width,
        y: 300,
        image: images.levels['1'].blockTri,
        block: true,
      }),
      new Platform({
        x: 1878 + lgPlatform.width + 175,
        y: 360,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 1878 + lgPlatform.width + 155 + 200,
        y: 300,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 1878 + lgPlatform.width + 155 + 200 + 200,
        y: 330,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 1878 + lgPlatform.width + 155 + 200 + 200 + 200,
        y: 240,
        image: images.levels['1'].block,
        block: true,
      }),
      new Platform({
        x: 4734 - mdPlatform.width / 2,
        y: canvas.height - lgPlatform.height - mdPlatform.height,
        image: mdPlatform,
      }),
      new Platform({
        x: 5987,
        y: canvas.height - lgPlatform.height - mdPlatform.height,
        image: mdPlatform,
      }),
      new Platform({
        x: 5987,
        y: canvas.height - lgPlatform.height - mdPlatform.height * 2,
        image: mdPlatform,
      }),
      new Platform({
        x: 6787,
        y: canvas.height - lgPlatform.height - mdPlatform.height,
        image: mdPlatform,
      }),
      new Platform({
        x: 6787,
        y: canvas.height - lgPlatform.height - mdPlatform.height * 2,
        image: mdPlatform,
      }),
      new Platform({
        x: 6787,
        y: canvas.height - lgPlatform.height - mdPlatform.height * 3,
        image: mdPlatform,
      }),
    ];

    genericObjects = [
      new GenericObject({
        x: -1,
        y: -1,
        image: images.levels['2'].background,
      }),
      new GenericObject({
        x: -1,
        y: canvas.height - mountains.height,
        image: mountains,
      }),
    ];

    keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
    };

    const platformsMap = [
      'lg',
      'md',
      'gap',
      'gap',
      'gap',
      'lg',
      'gap',
      'gap',
      'gap',
      'gap',
      'gap',
      'gap',
      'lg',
      'lg',
      'gap',
      'gap',
      'md',
      'gap',
      'gap',
      'md',
      'gap',
      'gap',
      'lg',
    ];

    let platformDistance = 0;

    platformsMap.forEach(symbol => {
      switch (symbol) {
        case 'md':
          platforms.push(new Platform({
            x: platformDistance,
            y: canvas.height - mdPlatform.height,
            image: mdPlatform,
            block: true,
          }));
          platformDistance += mdPlatform.width - 3;
          break;

        case 'lg':
          platforms.push(
            new Platform({
              x: platformDistance - 2,
              y: canvas.height - lgPlatform.height,
              image: lgPlatform,
              block: true,
            }),
          );
          platformDistance += lgPlatform.width - 3;
          break;

        case 'gap':
          platformDistance += 175;
          break;

        case 't':
          platforms.push(new Platform({
            x: platformDistance,
            y: canvas.height - images.levels['1'].tPlatform.height,
            image: images.levels['1'].tPlatform,
            block: true,
          }));
          platformDistance += images.levels['1'].tPlatform.width - 2;
          break;

        case 'xt':
          platforms.push(new Platform({
            x: platformDistance,
            y: canvas.height - images.levels['1'].xtPlatform.height,
            image: images.levels['1'].xtPlatform,
            block: true,
          }));
          platformDistance += images.levels['1'].xtPlatform.width - 2;
          break;
      }
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach(GenericObject => {
      GenericObject.update();
      GenericObject.velocity.x = 0;
    });

    particles.forEach((particle, i) => {
      particle.update();

      if (particle.fireball &&
        (particle.position.x - particle.radius >= canvas.width ||
          particle.position.x + particle.radius <= 0))
        setTimeout(() => {
          particles.splice(i, 1);
        }, 0);
    });

    platforms.forEach(platform => {
      platform.update();
      platform.velocity.x = 0;
    });

    if (flagPole) {
      flagPole.update();
      flagPole.velocity.x = 0;

      //mario touches flagPole, win condition, complete level
      if (!game.disableUserInput &&
        objectsTouch({
          object1: player,
          object2: flagPole,
        })) {
        audio.audioCompleteLevel.play();
        audio.audioMusicLevel1.stop();
        game.disableUserInput = true;
        player.velocity.x = 0;
        player.velocity.y = 0;
        gravity = 0;

        player.currentSprite = player.sprites.stand.right;

        if (player.powerUps.fireFlower)
          player.currentSprite = player.sprites.stand.fireFlower.right;

        //flagpole slide
        setTimeout(() => {
          audio.audioDescend.play();
        }, 200);
        gsap.to(player.position, {
          y: canvas.height - images.levels['1'].lgPlatform.height - player.height,
          duration: 1,
          onComplete() {
            player.currentSprite = player.sprites.run.right;

            if (player.powerUps.fireFlower)
              player.currentSprite = player.sprites.run.fireFlower.right;
          },
        });
        gsap.to(player.position, {
          delay: 1,
          x: canvas.width,
          duration: 2,
          ease: 'power1.in',
        });

        //fireworks
        const particleCount = 300;
        const radians = Math.PI * 2 / particleCount;
        const power = 8;
        let increment = 1;

        const intervalId = setInterval(() => {
          for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle({
              position: {
                x: canvas.width / 4 * increment,
                y: canvas.height / 2,
              },
              velocity: {
                x: Math.cos(radians * i) * power * Math.random(),
                y: Math.sin(radians * i) * power * Math.random(),
              },
              radius: 3 * Math.random(),
              color: `hsl(${Math.random() * 200}, 50%, 50%)`,
              fades: true,
            }));
          }
          audio.audioFireworkBurst.play();
          audio.audioFireworkWhistle.play();

          if (increment === 3) clearInterval(intervalId);
          increment++;
        }, 1000);

        //switch to the next level
        setTimeout(() => {
          currentLevel++;
          gravity = 1.5;
          selectLevel(currentLevel);
        }, 8000);
      }
    }

    //mario obtains power up
    fireFlowers.forEach((fireFlower, i) => {
      if (objectsTouch({
        object1: player,
        object2: fireFlower,
      })) {
        audio.audioObtainPowerUp.play();
        player.powerUps.fireFlower = true;
        setTimeout(() => {
          fireFlowers.splice(i, 1);
        }, 0);
      } else fireFlower.update();
    });

    goombas.forEach((goomba, index) => {
      goomba.update();

      // remove goomba on fireball hit
      particles.forEach((particle, particleIndex) => {
        if (
          particle.fireball &&
          particle.position.x + particle.radius >= goomba.position.x &&
          particle.position.y + particle.radius >= goomba.position.y &&
          particle.position.x - particle.radius <=
          goomba.position.x + goomba.width &&
          particle.position.y - particle.radius <=
          goomba.position.y + goomba.height
        ) {
          for (let i = 0; i < 50; i++) {
            particles.push(
              new Particle({
                position: {
                  x: goomba.position.x + goomba.width / 2,
                  y: goomba.position.y + goomba.height / 2,
                },
                velocity: {
                  x: (Math.random() - 0.5) * 7,
                  y: (Math.random() - 0.5) * 15,
                },
                radius: Math.random() * 3,
              }),
            );
          }
          setTimeout(() => {
            goombas.splice(index, 1);
            particles.splice(particleIndex, 1);
          }, 0);
        }
      });

      //goomba stomp squish / squash
      if (collisionTop({
        object1: player,
        object2: goomba,
      })) {
        audio.goombaSquash.play();
        for (let i = 0; i < 50; i++) {
          particles.push(new Particle({
            position: {
              x: goomba.position.x + goomba.width / 2,
              y: goomba.position.y + goomba.height / 2,
            },
            velocity: {
              x: (Math.random() - 0.5) * 7,
              y: (Math.random() - 0.5) * 15,
            },
            radius: Math.random() * 3,
          }));
        }
        player.velocity.y -= 40;
        setTimeout(() => {
          goombas.splice(index, 1);
        }, 0);
      } else if (
        player.position.x + player.width >= goomba.position.x &&
        player.position.y + player.height >= goomba.position.y &&
        player.position.x <= goomba.position.x + goomba.width
      ) {
        //player hits goomba
        //lose fireflower / lose powerup
        if (player.powerUps.fireFlower) {
          player.invincible = true;
          player.powerUps.fireFlower = false;
          audio.audioLosePowerUp.play();

          setTimeout(() => {
            player.invincible = false;
          }, 1000);
        } else if (!player.invincible) {
          audio.audioDie.play();
          selectLevel(currentLevel);
        }
      }
    });

    player.update();

    if (game.disableUserInput) return;

    // scrolling code starts
    let hitSide = false;
    if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = player.speed;
    } else if ((keys.left.pressed && player.position.x > 100) ||
      (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
      player.velocity.x = -player.speed;
    } else {
      player.velocity.x = 0;

      //scrolling code
      if (keys.right.pressed) {
        for (let i = 0; i < platforms.length; i++) {
          const platform = platforms[i];
          platform.velocity.x = -player.speed;
          if (platform.block && hitSideOfPlatform({
            object: player,
            platform,
          })) {
            platforms.forEach((platform) => {
              platform.velocity.x = 0;
            });
            hitSide = true;
            break;
          }
        }

        if (!hitSide) {
          scrollOffset += player.speed;

          flagPole.velocity.x = -player.speed;

          genericObjects.forEach((GenericObject) => {
            GenericObject.velocity.x = -player.speed * 0.66;
          });
          goombas.forEach((goomba) => {
            goomba.position.x -= player.speed;
          });
          fireFlowers.forEach((fireFlower) => {
            fireFlower.position.x -= player.speed;
          });
          particles.forEach((particle) => {
            particle.position.x -= player.speed;
          });
        }
      } else if (keys.left.pressed && scrollOffset > 0) {
        for (let i = 0; i < platforms.length; i++) {
          const platform = platforms[i];
          platform.velocity.x = player.speed;

          if (platform.block && hitSideOfPlatform({
            object: player,
            platform,
          })) {
            platforms.forEach((platform) => {
              platform.velocity.x = 0;
            });
            hitSide = true;
            break;
          }
        }

        if (!hitSide) {
          scrollOffset -= player.speed;

          flagPole.velocity.x = player.speed;

          genericObjects.forEach((GenericObject) => {
            GenericObject.velocity.x = player.speed * .66;
          });
          goombas.forEach((goomba) => {
            goomba.position.x += player.speed;
          });
          fireFlowers.forEach((fireFlower) => {
            fireFlower.position.x += player.speed;
          });
          particles.forEach((particle) => {
            particle.position.x += player.speed;
          });
        }
      }
    }

    // Platform collision detection
    platforms.forEach(platform => {
      if (isOnTopPlatform({
        object: player,
        platform,
      })) {
        player.velocity.y = 0;
      }

      if (platform.block && hitBottomOfPlatform({
        object: player,
        platform,
      })) {
        player.velocity.y = -player.velocity.y;
      }

      if (platform.block && hitSideOfPlatform({
        object: player,
        platform,
      })) {
        player.velocity.x = 0;
      }

      //particles bounce
      particles.forEach((particle, index) => {
        if (isOnTopPlatformCircle({
          object: particle,
          platform,
        })) {
          particle.velocity.y = -particle.velocity.y * .99;
          if (particle.radius - 0.4 < 0) particles.splice(index, 1);
          else particle.radius -= 0.4;
        }
        if (particle.ttl < 0) particles.splice(index, 1);
      });
      goombas.forEach((goomba) => {
        if (isOnTopPlatform({
          object: goomba,
          platform,
        })) goomba.velocity.y = 0;
      });

      fireFlowers.forEach((fireFlower) => {
        if (isOnTopPlatform({
          object: fireFlower,
          platform,
        })) fireFlower.velocity.y = 0;
      });
    });

    // lose condition
    if (player.position.y > canvas.height) {
      audio.audioDie.play();
      selectLevel(currentLevel);
    }

    // sprite Switch
    if (player.shooting) {
      player.currentSprite = player.sprites.shoot.fireFlower.right;

      if (lastKey ===
        'left') player.currentSprite = player.sprites.shoot.fireFlower.left;
      return;
    }
    // sprite jump
    if (player.velocity.y !== 0) return;

    if (keys.right.pressed && lastKey === 'right' && player.currentSprite !==
      player.sprites.run.right) {
      player.currentSprite = player.sprites.run.right;
    } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !==
      player.sprites.run.left) {
      player.currentSprite = player.sprites.run.left;
    } else if (!keys.left.pressed && lastKey === 'left' &&
      player.currentSprite !== player.sprites.stand.left) {
      player.currentSprite = player.sprites.stand.left;
    } else if (!keys.right.pressed && lastKey === 'right' &&
      player.currentSprite !== player.sprites.stand.right) {
      player.currentSprite = player.sprites.stand.right;
    }

    // fireflower sprites
    if (!player.powerUps.fireFlower) return;
    if (keys.right.pressed && lastKey === 'right' && player.currentSprite !==
      player.sprites.run.fireFlower.right) {
      player.currentSprite = player.sprites.run.fireFlower.right;
    } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !==
      player.sprites.run.fireFlower.left) {
      player.currentSprite = player.sprites.run.fireFlower.left;
    } else if (!keys.left.pressed && lastKey === 'left' &&
      player.currentSprite !== player.sprites.stand.fireFlower.left) {
      player.currentSprite = player.sprites.stand.fireFlower.left;
    } else if (!keys.right.pressed && lastKey === 'right' &&
      player.currentSprite !== player.sprites.stand.fireFlower.right) {
      player.currentSprite = player.sprites.stand.fireFlower.right;
    }
  } // animation loop ends

  selectLevel(1);
  animate();

  window.addEventListener('keydown', ({keyCode}) => {
    if (game.disableUserInput) return;
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

        audio.audioJump.play();

        if (lastKey === 'right')
          player.currentSprite = player.sprites.jump.right;
        else player.currentSprite = player.sprites.jump.left;

        if (!player.powerUps.fireFlower) break;
        if (lastKey === 'right')
          player.currentSprite = player.sprites.jump.fireFlower.right;
        else player.currentSprite = player.sprites.jump.fireFlower.left;
        break;

      case 32:
        console.log('space');

        if (!player.powerUps.fireFlower) return;

        player.shooting = true;

        setTimeout(() => {
          player.shooting = false;
        }, 100);

        audio.audioFireFlowerShot.play();

        let velocity = 15;
        if (lastKey === 'left') velocity = -velocity;
        particles.push(new Particle({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y + player.height / 2,
          },
          velocity: {
            x: velocity,
            y: 0,
          },
          radius: 5,
          color: 'red',
          fireball: true,
        }));
        break;
    }
  });

  window.addEventListener('keyup', ({keyCode}) => {
    if (game.disableUserInput) return;
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
  });