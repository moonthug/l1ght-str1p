import SimplexNoise from 'simplex-noise';

import { Scene } from './Scene';

interface NoiseData {
  simplex: SimplexNoise,
}

export const noise: Scene<NoiseData> = {
  setup() {
    noise.data = {
      simplex: new SimplexNoise(),
    };
  },
  draw(canvas, frame, thingsProps) {
    canvas.getPixels().forEach((pixel, index) => {
      const rNoise = noise.data.simplex.noise2D(index + frame, (index + frame) * 2);
      const bNoise = noise.data.simplex.noise2D(index + frame + 2, (index + frame + 2) * 2);

      const red = 150 + Math.floor(rNoise * 100);
      const blue = 150 + Math.floor(bNoise * 100);

      canvas.setPixel(index, [red, 255, blue]);
    });
  },
};
