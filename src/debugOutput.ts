/* tslint:disable:no-console */
import * as chalk from 'chalk';
import { Colour } from './Canvas';

export function debugOutput(pixels: Colour[], frame: number) {
  let output = '';
  pixels.forEach((pixel: Colour) => {
    output += chalk.rgb(pixel[0], pixel[1], pixel[2])('■');
  });

  output += ` [${frame}]`;

  console.clear();
  process.stdout.write(output);
}
