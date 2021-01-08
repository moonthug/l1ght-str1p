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
  draw(canvas, frame, thingsProps) {
    canvas.fill([0, 0, 0]);

    const position = canvas.getLength() / 2 - (wobbler.data.simplex.noise2D(frame / 100, frame / 200) * 50);

    for (let i = 0; i < canvas.getLength(); i++) {
      if (i < position + 30 && i > position - 30) {
        const red = 255 - (Math.abs(i - position) / 30 * 255);
        canvas.setPixel(i, [ red, 0, 0 ]);
      }
    }
  },
};
