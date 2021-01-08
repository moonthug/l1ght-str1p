import { Scene } from './Scene';

export const nightrider: Scene = {
  setup() {
    //
  },
  draw(canvas, frame, thingsProps) {
    canvas.fill([0, 0, 0]);
    const position = frame & canvas.getLength();
    canvas.setPixel(position, [255, 0, 0]);
  },
};
