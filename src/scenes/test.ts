import { Scene } from './Scene';

export const test: Scene = {
  draw(canvas) {
    for(let i = 0; i < canvas.getLength(); i++) {

      if (i >= (canvas.getLength() / 3) * 2) {
        canvas.setPixel(i, [0, 0, 255]);
      } else if (i >= (canvas.getLength() / 3 ) && i < ((canvas.getLength() / 3 ) * 2)) {
        canvas.setPixel(i, [0, 255, 0]);
      } else if (i >= 2) {
        canvas.setPixel(i, [255, 0, 0]);
      } else {
        canvas.setPixel(i, [255, 255, 255]);
      }
    }
  },
};
