const bgImage2 = new Image();
bgImage2.src = '../sprites/level2/background.png';

const mountains = new Image();
mountains.src = '../sprites/level2/mountains.png';

const lgPlatformLevelTwo = new Image();
lgPlatformLevelTwo.src = '../sprites/level2/lgPlatform.png';

const mdPlatformLevelTwo = new Image();
mdPlatformLevelTwo.src = '../sprites/level2/mdPlatform.png';

const spriteFireFlowerShootLeft = new Image();
spriteFireFlowerShootLeft.src = '../sprites/spriteFireFlowerShootLeft.png';

const spriteFireFlowerShootRight = new Image();
spriteFireFlowerShootRight.src = '../sprites/spriteFireFlowerShootRight.png';

export const images = {
  mario: {
    shoot: {
      fireFlower: {
        right: spriteFireFlowerShootRight,
        left: spriteFireFlowerShootLeft,
      },
    },
  },
  levels: {
    1: {
      background: '',
    },
    2: {
      background: bgImage2,
      mountains,
      lgPlatform: lgPlatformLevelTwo,
      mdPlatform: mdPlatformLevelTwo,
    },
  },
};