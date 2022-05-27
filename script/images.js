let bgImage2 = new Image();
bgImage2.src = '../sprites/level2/background.png';

let mountains = new Image();
mountains.src = '../sprites/level2/mountains.png';

let lgPlatformLevelTwo = new Image();
lgPlatformLevelTwo.src = '../sprites/level2/lgPlatform.png';

let mdPlatformLevelTwo = new Image();
mdPlatformLevelTwo.src = '../sprites/level2/mdPlatform.png';

let spriteFireFlowerShootLeft = new Image();
spriteFireFlowerShootLeft.src = '../sprites/spriteFireFlowerShootLeft.png';

let spriteFireFlowerShootRight = new Image();
spriteFireFlowerShootRight.src = '../sprites/spriteFireFlowerShootRight.png';

let spriteRunLeft = new Image();
spriteRunLeft.src = '../sprites/spriteMarioRunLeft.png';

let spriteRunRight = new Image();
spriteRunRight.src = '../sprites/spriteMarioRunRight.png';

let spriteStandLeft = new Image();
spriteStandLeft.src = '../sprites/spriteMarioStandLeft.png';

let spriteStandRight = new Image();
spriteStandRight.src = '../sprites/spriteMarioStandRight.png';

let spriteMarioJumpLeft = new Image();
spriteMarioJumpLeft.src = '../sprites/spriteMarioJumpLeft.png';

let spriteMarioJumpRight = new Image();
spriteMarioJumpRight.src = '../sprites/spriteMarioJumpRight.png';

let background = new Image();
background.src = '../sprites/background.png';

let platform = new Image();
platform.src = '../sprites/platform.png';

let hills = new Image();
hills.src = '../sprites/hills.png';

let platformSmallTall = new Image();
platformSmallTall.src = '../sprites/platformSmallTall.png';

let block = new Image();
block.src = '../sprites/block.png';

let blockTri = new Image();
blockTri.src = '../sprites/blockTri.png';

let lgPlatform = new Image();
lgPlatform.src = '../sprites/lgPlatform.png';

let mdPlatform = new Image();
mdPlatform.src = '../sprites/mdPlatform.png';

let tPlatform = new Image();
tPlatform.src = '../sprites/tPlatform.png';

let xtPlatform = new Image();
xtPlatform.src = '../sprites/xtPlatform.png';

let flagPoleSprite = new Image();
flagPoleSprite.src = '../sprites/flagPole.png';

let spriteGoomba = new Image();
spriteGoomba.src = '../sprites/spriteGoomba.png';

let fireFlower = new Image();
fireFlower.src = '../sprites/spriteFireFlower.png';

let fireFlowerStandLeft = new Image();
fireFlowerStandLeft.src = '../sprites/spriteFireFlowerStandLeft.png';

let fireFlowerStandRight = new Image();
fireFlowerStandRight.src = '../sprites/spriteFireFlowerStandRight.png';

let fireFlowerRunRight = new Image();
fireFlowerRunRight.src = '../sprites/spriteFireFlowerRunRight.png';

let fireFlowerRunLeft = new Image();
fireFlowerRunLeft.src = '../sprites/spriteFireFlowerRunLeft.png';

let fireFlowerJumpLeft = new Image();
fireFlowerJumpLeft.src = '../sprites/spriteFireFlowerJumpLeft.png';

let fireFlowerJumpRight = new Image();
fireFlowerJumpRight.src = '../sprites/spriteFireFlowerJumpRight.png';

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