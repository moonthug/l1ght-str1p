import SimplexNoise from 'simplex-noise';

import { Plugin } from './Plugin';

interface ColoursData {
  simplex: SimplexNoise,
}

export const noise: Plugin<ColoursData> = {
  setup() {
    noise.data = {
      simplex: new SimplexNoise(),
    };
  },
  draw(canvas, frame, thingsProps) {
    canvas.getPixels().forEach((pixel, index) => {
      const rNoise = noise.data.simplex.noise2D(index + frame, (index + frame) * 2);
      const bNoise = noise.data.simplex.noise2D(index + frame + 2, (index + frame + 2) * 2);

      const red = Math.floor(rNoise * 50) + ((thingsProps.brightness / 100) * 200);
      const blue = Math.floor(bNoise * 100) + ((thingsProps.brightness / 100) * 150);

      canvas.setPixel(index, [red, 255, blue]);
    });
  },
};
