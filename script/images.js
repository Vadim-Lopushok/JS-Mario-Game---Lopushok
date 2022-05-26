const bgImage2 = new Image();
bgImage2.src = '../sprites/level2/background.png';

const mountains = new Image();
mountains.src = '../sprites/level2/mountains.png';

const lgPlatformLevelTwo = new Image();
lgPlatformLevelTwo.src = '../sprites/level2/lgPlatform.png';

const mdPlatformLevelTwo = new Image();
mdPlatformLevelTwo.src = '../sprites/level2/mdPlatform.png';

export const images = {
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