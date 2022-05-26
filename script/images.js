/*import backgroundLevel2 from '../sprites/level2/background.png';*/
const bgImage2 = new Image();
bgImage2.src = '../sprites/level2/background.png';

const  mountains = new Image();
mountains.src = '../sprites/level2/mountains.png'

const lgPlatformLevelTwo = new Image();
lgPlatformLevelTwo.src = '../sprites/level2/lgPlatform.png'

export const images = {
  levels: {
    1: {
      background: '',
    },
    2: {
      background: bgImage2,
      mountains,
      lgPlatform: lgPlatformLevelTwo,
    },
  },
};

/*
images.background;*/
