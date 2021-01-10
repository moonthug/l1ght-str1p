import SimplexNoise from 'simplex-noise';

import { Scene } from './Scene';

interface WobblerData {
  simplex: SimplexNoise,
}

export const wobbler: Scene<WobblerData> = {
  setup() {
    wobbler.data = {
      simplex: new SimplexNoise(),
    };
  },
  draw(canvas, frame) {
    canvas.fill([0, 0, 0]);

    const width = 30; // 30 - (wobbler.data.simplex.noise2D(frame, frame) * 10);
    const position = canvas.getLength() / 2 - (wobbler.data.simplex.noise2D(frame / 1000, frame / 2000) * 50);

    for (let i = 0; i < canvas.getLength(); i++) {
      if (i < position + width && i > position - width) {
        const blue = Math.floor(255 - (Math.abs(i - position) / width * 255));
        canvas.setPixel(i, [ 0, 0, blue ]);
      }
    }
  },
};
