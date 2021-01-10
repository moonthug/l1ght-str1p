export type Colour = [number, number, number] | [number, number, number, number] ;

export class Canvas {
  private readonly pixels: Colour[];
  private readonly pixelsData: Uint32Array;

  constructor(private length: number) {
    this.pixels = new Array<Colour>(length);
    this.pixelsData = new Uint32Array(length);
    this.clear();
  }

  clear() {
    this.fill([0, 0, 0]);
  }

  fill(colour: Colour) {
    this.applyAlpha(colour);

    this.pixels.fill(colour);
    this.pixelsData.fill(this.rgb2Int(colour));
  }

  setPixel(index: number, colour: Colour) {
    this.applyAlpha(colour);

    this.pixels[index] = colour;
    this.pixelsData[index] = this.rgb2Int(colour);
  }

  getLength() {
    return this.length;
  }

  getPixels() {
    return this.pixels.slice();
  }

  getPixelsData() {
    return this.pixelsData.slice();
  }

  rgb2Int(colour: Colour) {
    return ((colour[2] & 0xFF) << 16) + ((colour[1] & 0xFF) << 8) + (colour[0] & 0xFF);
  }

  private applyAlpha(colour: Colour) {
    if (colour[3]) {
      const shade = colour[3] / 255;
      colour[0] = colour[0] * (1 - shade);
      colour[1] = colour[1] * (1 - shade);
      colour[2] = colour[2] * (1 - shade);
    }
    return colour;
  }
}
