import ws281x from 'rpi-ws281x-native';
import {
  setDriftlessInterval,
} from 'driftless';
import { Canvas } from './Canvas';
import { debugOutput } from './debugOutput';
import { ThingProps } from './hap';
import { Scene } from './scenes/Scene';

interface DisplayOptions {

}

export class Display {
  private readonly canvas: Canvas;

  constructor(ledCount: number, private scenes: Scene[], private thingProps: ThingProps, options?: DisplayOptions) {
    this.canvas = new Canvas(ledCount);
    ws281x.init(ledCount);
  }

  run() {
    let frame = 0;

    // Move to .env
    const INTERVAL = 1000 / 60;
    const SCENE_DURATION = 10 * 60;

    // @TODO Add plugin sequencer
    let scene = this.scenes[0];
    let currentScene = 0;

    let brightness = this.thingProps.brightness;

    const timer = setDriftlessInterval(async () => {
      if (frame % SCENE_DURATION === 0) {
        // @TODO Make this nicer, add fade, queue, properly awaited setup call etc
        currentScene = (currentScene + 1) % this.scenes.length;
        scene = this.scenes[currentScene];

        if (scene.setup) {
          scene.setup(this.canvas, this.thingProps);
        }
      }

      if (brightness !== this.thingProps.brightness) {
        brightness = this.thingProps.brightness;
        ws281x.setBrightness(brightness);
      }

      scene.draw(this.canvas, frame, this.thingProps);

      if (process.env.DEBUG) {
        debugOutput(this.canvas.getPixels(), frame);
      }

      ws281x.render(this.canvas.getPixelsData());

      frame++;
    }, INTERVAL);
  }
}
