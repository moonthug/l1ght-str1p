import SimplexNoise from 'simplex-noise';

import { Scene } from './Scene';

interface NoiseData {
  simplex: SimplexNoise;
}

export const scene: Scene<NoiseData> = {
  setup () {
    scene.data = {
      simplex: new SimplexNoise()
    };
  },
  draw (canvas, frame, thingProps) {
    canvas.clear();

    canvas.getPixels().forEach((pixel, index) => {
      const val = index + frame;
      const bNoise = scene.data.simplex.noise2D((val - 1) / 5, (val - 1) / 5);
      const aNoise = scene.data.simplex.noise2D((val - 2) / 50, (val - 2) / 50);

      const blue = 150 + Math.floor(bNoise * 100);
      const alpha = 128 + Math.floor(aNoise * 128);

      canvas.setPixel(index, [0, 255, blue, alpha]);
    });
  }
};
