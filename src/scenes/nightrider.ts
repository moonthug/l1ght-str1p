import { Scene } from './Scene';

export const nightrider: Scene = {
  setup() {
    //
  },
  draw(canvas, frame, thingsProps) {
    canvas.fill([0, 0, 0]);

    const position = Math.abs(canvas.getLength()  - (frame % (canvas.getLength() * 2)));

    for (let i = 0; i < canvas.getLength(); i++) {
      if (i < position + 10 && i > position - 10) {
        const red = 255 - (Math.abs(i - position) / 10 * 255);
        canvas.setPixel(i, [ red, 0, 0 ]);
      }
    }
  },
};
