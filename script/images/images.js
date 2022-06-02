const bgImage2 = new Image();
bgImage2.src = '../../sprites/level2/background.png';

const mountains = new Image();
mountains.src = '../../sprites/level2/mountains.png';

const lgPlatformLevelTwo = new Image();
lgPlatformLevelTwo.src = '../../sprites/level2/lgPlatform.png';

const mdPlatformLevelTwo = new Image();
mdPlatformLevelTwo.src = '../../sprites/level2/mdPlatform.png';

const spriteFireFlowerShootLeft = new Image();
spriteFireFlowerShootLeft.src = '../../sprites/marioFireFlower/spriteFireFlowerShootLeft.png';

const spriteFireFlowerShootRight = new Image();
spriteFireFlowerShootRight.src = '../../sprites/marioFireFlower/spriteFireFlowerShootRight.png';

const spriteRunLeft = new Image();
spriteRunLeft.src = '../../sprites/mario/spriteMarioRunLeft.png';

const spriteRunRight = new Image();
spriteRunRight.src = '../../sprites/mario/spriteMarioRunRight.png';

const spriteStandLeft = new Image();
spriteStandLeft.src = '../../sprites/mario/spriteMarioStandLeft.png';

const spriteStandRight = new Image();
spriteStandRight.src = '../../sprites/mario/spriteMarioStandRight.png';

const spriteMarioJumpLeft = new Image();
spriteMarioJumpLeft.src = '../../sprites/mario/spriteMarioJumpLeft.png';

const spriteMarioJumpRight = new Image();
spriteMarioJumpRight.src = '../../sprites/mario/spriteMarioJumpRight.png';

const background = new Image();
background.src = '../../sprites/background/background.png';

const platform = new Image();
platform.src = '../../sprites/blockPlatform/platform.png';

const hills = new Image();
hills.src = '../../sprites/blockPlatform/hills.png';

const platformSmallTall = new Image();
platformSmallTall.src = '../../sprites/blockPlatform/platformSmallTall.png';

const block = new Image();
block.src = '../../sprites/blockPlatform/block.png';

const blockTri = new Image();
blockTri.src = '../../sprites/blockPlatform/blockTri.png';

const lgPlatform = new Image();
lgPlatform.src = '../../sprites/blockPlatform/lgPlatform.png';

const mdPlatform = new Image();
mdPlatform.src = '../../sprites/blockPlatform/mdPlatform.png';

const tPlatform = new Image();
tPlatform.src = '../../sprites/blockPlatform/tPlatform.png';

const xtPlatform = new Image();
xtPlatform.src = '../../sprites/blockPlatform/xtPlatform.png';

const flagPoleSprite = new Image();
flagPoleSprite.src = '../../sprites/blockPlatform/flagPole.png';

const spriteGoomba = new Image();
spriteGoomba.src = '../../sprites/blockPlatform/spriteGoomba.png';

const fireFlower = new Image();
fireFlower.src = '../../sprites/marioFireFlower/spriteFireFlower.png';

const fireFlowerStandLeft = new Image();
fireFlowerStandLeft.src = '../../sprites/marioFireFlower/spriteFireFlowerStandLeft.png';

const fireFlowerStandRight = new Image();
fireFlowerStandRight.src = '../../sprites/marioFireFlower/spriteFireFlowerStandRight.png';

const fireFlowerRunRight = new Image();
fireFlowerRunRight.src = '../../sprites/marioFireFlower/spriteFireFlowerRunRight.png';

const fireFlowerRunLeft = new Image();
fireFlowerRunLeft.src = '../../sprites/marioFireFlower/spriteFireFlowerRunLeft.png';

const fireFlowerJumpLeft = new Image();
fireFlowerJumpLeft.src = '../../sprites/marioFireFlower/spriteFireFlowerJumpLeft.png';

const fireFlowerJumpRight = new Image();
fireFlowerJumpRight.src = '../../sprites/marioFireFlower/spriteFireFlowerJumpRight.png';

export const images = {
  mario: {
    shoot: {
      fireFlower: {
        right: spriteFireFlowerShootRight,
        left: spriteFireFlowerShootLeft,
      },
    },
    run: {
      left: spriteRunLeft,
      right: spriteRunRight,
    },
    stand: {
      left: spriteStandLeft,
      right: spriteStandRight,
    },
    jump: {
      left: spriteMarioJumpLeft,
      right: spriteMarioJumpRight,
    },
    fireFlower: {
      stand: {
        face: fireFlower,
        left: fireFlowerStandLeft,
        right: fireFlowerStandRight,
      },
      run: {
        left: fireFlowerRunLeft,
        right: fireFlowerRunRight,
      },
      jump: {
        left: fireFlowerJumpLeft,
        right: fireFlowerJumpRight,
      },
    },
  },
  levels: {
    1: {
      background: background,
      platform,
      hills,
      platformSmallTall,
      block,
      blockTri,
      lgPlatform,
      mdPlatform,
      tPlatform,
      xtPlatform,
      flagPoleSprite,
    },
    2: {
      background: bgImage2,
      mountains,
      lgPlatform: lgPlatformLevelTwo,
      mdPlatform: mdPlatformLevelTwo,
    },
  },
  goomba: {
    spriteGoomba,
  },
};