import SimplexNoise from 'simplex-noise';

import { Scene } from './Scene';

interface WobblerData {
  simplex: SimplexNoise,
}

export const scene: Scene<WobblerData> = {
  setup () {
    scene.data = {
      simplex: new SimplexNoise(),
    };
  },
  draw (canvas, frame) {
    canvas.fill([0, 0, 0]);

    const width = 30 - (scene.data.simplex.noise2D(frame / 400, frame / 400) * 10);
    const position = canvas.getLength() / 2 - (scene.data.simplex.noise2D(frame / 1000, frame / 1000) * 50);

    for (let i = 0; i < canvas.getLength(); i++) {
      if (i < position + width && i > position - width) {
        const alpha = Math.floor(255 - (Math.abs(i - position) / width * 255));
        canvas.setPixel(i, [ 128, 0, 255, alpha ]);
      }
    }
  }
};
