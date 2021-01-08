import SimplexNoise from 'simplex-noise';

import { Scene } from './Scene';

interface NoiseData {
  simplex: SimplexNoise,
}

export const noise2: Scene<NoiseData> = {
  setup() {
    noise2.data = {
      simplex: new SimplexNoise(),
    };
  },
  draw(canvas, frame, thingsProps) {
    canvas.getPixels().forEach((pixel, index) => {
      const rNoise = noise2.data.simplex.noise2D(index, index + 1);
      const gNoise = noise2.data.simplex.noise2D(index, index + 2);

      const red = Math.floor(rNoise * 50);
      const green = Math.floor(gNoise * 100);

      canvas.setPixel(index, [red, green, 255]);
    });
  },
};
