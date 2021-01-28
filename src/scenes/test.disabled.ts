import { Scene } from './Scene';

export const scene: Scene = {
  draw(canvas) {
    const count = canvas.getLength();

    for(let i = 0; i < count; i++) {
      if (i >= (count / 3) * 2) {
        canvas.setPixel(i, [0, 0, 255]);
      } else if (i >= (count / 3 ) && i < ((count / 3 ) * 2)) {
        canvas.setPixel(i, [0, 255, 0]);
      } else if (i >= 0) {
        const alpha = Math.floor(255 * (i / (count / 3)));
        canvas.setPixel(i, [255, 0, 0, alpha]);
      } else {
        canvas.setPixel(i, [255, 255, 255]);
      }
    }
  },
};
