export type Colour = [number, number, number];

export class Canvas {
  private readonly pixels: Colour[];

  constructor(private length: number) {
    this.pixels = new Array<Colour>(length);
    this.clear();
  }

  clear() {
    this.fill([0, 0, 0]);
  }

  fill(colour: Colour) {
    this.pixels.fill(colour);
  }

  setPixel(index: number, colour: Colour) {
    this.pixels[index] = colour;
  }

  getPixels() {
    return this.pixels.slice();
  }
}
