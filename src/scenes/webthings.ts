import { Scene } from './Scene';

export const webthings: Scene = {
  setup() {

  },
  draw(canvas, frame, thingsProps) {
    if (!thingsProps.on) {
      return canvas.fill([0, 0, 0]);
    }
    canvas.getPixels().forEach((pixel, index) => {
      canvas.setPixel(index, [
        255 * thingsProps.brightness / 100,
        255 * thingsProps.brightness / 100,
        255 * thingsProps.brightness / 100
      ]);
    });
  },
};
