import SimplexNoise from 'simplex-noise';

import { Scene } from './Scene';

interface NoiseData {
  simplex: SimplexNoise,
}

export const scene: Scene<NoiseData> = {
  setup() {
    scene.data = {
      simplex: new SimplexNoise(),
    };
  },
  draw(canvas, frame, thingProps) {
    canvas.getPixels().forEach((pixel, index) => {
      const rNoise = scene.data.simplex.noise2D(index + frame, (index + frame) * 2);
      const bNoise = scene.data.simplex.noise2D(index + frame + 2, (index + frame + 2) * 2);

      const red = 150 + Math.floor(rNoise * 100);
      const blue = 150 + Math.floor(bNoise * 100);

      canvas.setPixel(index, [red, 255, blue]);
    });
  },
};
