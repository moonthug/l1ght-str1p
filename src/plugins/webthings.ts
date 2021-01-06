import { Plugin } from './Plugin';

export const webthings: Plugin = {
  setup() {

  },
  draw(canvas, frame, webThingProps) {
    if (!webThingProps.on) {
      return canvas.fill([0, 0, 0]);
    }
    canvas.getPixels().forEach((pixel, index) => {
      canvas.setPixel(index, [
        255 * webThingProps.brightness / 100,
        255 * webThingProps.brightness / 100,
        255 * webThingProps.brightness / 100
      ]);
    });
  },
};
