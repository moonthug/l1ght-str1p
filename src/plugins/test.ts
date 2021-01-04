import { Plugin } from './Plugin';

export const test: Plugin = {
  draw(canvas, frame) {
    canvas.setPixel(0, [ frame % 255, 0, 0 ]);
    canvas.setPixel(1, [ 0, 255, 0 ]);
    canvas.setPixel(2, [ 0, 0, 255 ]);
  },
};
