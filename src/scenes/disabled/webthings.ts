import { Scene } from '../Scene';

export const scene: Scene = {
  setup() {

  },
  draw(canvas, frame, thingProps) {
    if (!thingProps.on) {
      return canvas.fill([0, 0, 0]);
    }
    canvas.getPixels().forEach((pixel, index) => {
      canvas.setPixel(index, [
        255 * thingProps.brightness / 100,
        255 * thingProps.brightness / 100,
        255 * thingProps.brightness / 100
      ]);
    });
  },
};
