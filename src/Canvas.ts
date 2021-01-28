import color = Mocha.reporters.Base.color;

export type Colour = [number, number, number] | [number, number, number, number] ;

export class Canvas {
  private readonly pixels: Colour[];
  private readonly pixelsData: Uint32Array;

  constructor(private length: number) {
    this.pixels = new Array<Colour>(length);
    this.pixelsData = new Uint32Array(length);
    this.clear();
  }

  clear () {
    this.fill([0, 0, 0]);
  }

  fill (colour: Colour) {
    this.applyAlpha(colour);

    this.pixels.fill(colour);
    this.pixelsData.fill(this.rgb2Int(colour));
  }

  gradient(fromIndex: number, toIndex: number, fromColour: Colour, toColour: Colour) {
    for (let i = fromIndex; i < toIndex; i++) {
      const fraction = i / (toIndex - fromIndex);
      const colour = this.lerp(fromColour, toColour, fraction);
      this.setPixel(i, colour);
    }
  }

  setPixel (index: number, colour: Colour) {
    this.applyAlpha(colour);

    this.pixels[index] = colour;
    this.pixelsData[index] = this.rgb2Int(colour);
  }

  setAlpha (alpha: number) {
    this.pixels.forEach((colour, i) => {
      this.setPixel(i, [colour[0], colour[1], colour[3], alpha]);
    });
  }

  getLength () {
    return this.length;
  }

  getPixels () {
    return this.pixels.slice();
  }

  getPixelsData () {
    return this.pixelsData.slice();
  }

  rgb2Int (colour: Colour) {
    return ((colour[1] & 0xFF) << 16) + ((colour[0] & 0xFF) << 8) + (colour[2] & 0xFF);
  }

  lerp (colour1: Colour, colour2: Colour, fraction: number): Colour {
    const r1 = colour1[0];
    const r2 = colour2[0];
    const g1 = colour1[1];
    const g2 = colour2[1];
    const b1 = colour1[2];
    const b2 = colour2[2];
    const a1 = colour1[3] || 255;
    const a2 = colour2[3] || 255;

    return [
      (r2 - r1) * fraction + r1,
      (g2 - g1) * fraction + g1,
      (b2 - b1) * fraction + b1,
      (a2 - a1) * fraction + a1
    ];
  }

  private applyAlpha (colour: Colour) {
    if (colour[3] !== undefined) {
      const shade = 1 - colour[3] / 255;
      colour[0] = colour[0] * (1 - shade);
      colour[1] = colour[1] * (1 - shade);
      colour[2] = colour[2] * (1 - shade);
    } else {
      colour[3] = 255;
    }

    return colour;
  }
}
