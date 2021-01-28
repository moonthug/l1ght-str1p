import color = Mocha.reporters.Base.color;

export type Colour = [number, number, number] | [number, number, number, number] ;
export enum BlendMode {
  NORMAL,
  ADD,
  SUBTRACT,
  MULTIPLY
}

export class Canvas {
  private readonly pixels: Colour[];
  private readonly pixelsData: Uint32Array;

  constructor (private length: number) {
    this.pixels = new Array<Colour>(length);
    this.pixelsData = new Uint32Array(length);
    this.clear();
  }

  public clear () {
    const clearColour: Colour = [0, 0, 0];
    this.pixels.fill(clearColour);
    this.pixelsData.fill(this.rgb2Int(clearColour));
  }

  public fill (colour: Colour, blendMode?: BlendMode) {
    for (let i = 0; i < this.length; i++) {
      this.setPixel(i, colour, blendMode);
    }
  }

  public gradient (fromIndex: number, toIndex: number, fromColour: Colour, toColour: Colour) {
    for (let i = fromIndex; i < toIndex; i++) {
      const fraction = i / (toIndex - fromIndex);
      const colour = this.lerp(fromColour, toColour, fraction);
      this.setPixel(i, colour);
    }
  }

  public setPixel (index: number, colour: Colour, blendMode: BlendMode = BlendMode.NORMAL) {
    // this.applyAlpha(colour);
    this.pixels[index] = this.blend(this.pixels[index], colour, blendMode);
    this.pixelsData[index] = this.rgb2Int(this.pixels[index]);
  }

  public setAlpha (alpha: number) {
    this.pixels.forEach((colour, i) => {
      this.setPixel(i, [colour[0], colour[1], colour[3], alpha]);
    });
  }

  public getLength () {
    return this.length;
  }

  public getPixels () {
    return this.pixels.slice();
  }

  public getPixelsData () {
    return this.pixelsData.slice();
  }

  public rgb2Int (colour: Colour) {
    return ((colour[1] & 0xFF) << 16) + ((colour[0] & 0xFF) << 8) + (colour[2] & 0xFF);
  }

  public blend (background: Colour, foreground: Colour, blendMode: BlendMode): Colour {
    // @TODO Add more blend modes
    switch (blendMode) {
      case BlendMode.NORMAL:
        if (foreground[3] === 0) {
          return background;
        }
        if (foreground[3] === 255) {
          return foreground;
        }
        background[3] = background[3] || 255;
        foreground[3] = foreground[3] || 255;
        const fraction = foreground[3] / 255;
        const colour = [
          Math.round((foreground[0] * fraction) + (background[0] * (1 - fraction))),
          Math.round((foreground[1] * fraction) + (background[1] * (1 - fraction))),
          Math.round((foreground[2] * fraction) + (background[2] * (1 - fraction)))
        ];
        return colour as Colour;
    }
  }

  public lerp (colour1: Colour, colour2: Colour, fraction: number): Colour {
    return [
      (colour2[0] - colour1[0]) * fraction + colour1[0],
      (colour2[1] - colour1[1]) * fraction + colour1[1],
      (colour2[2] - colour1[2]) * fraction + colour1[2],
      (colour2[3] - colour1[3]) * fraction + colour1[3]
    ];
  }

  private applyAlpha (colour: Colour) {
    if (colour[3] !== undefined) {
      const shade = 1 - colour[3] / 255;
      colour[0] = colour[0] * shade;
      colour[1] = colour[1] * shade;
      colour[2] = colour[2] * shade;
    } else {
      colour[3] = 255;
    }

    return colour;
  }
}
