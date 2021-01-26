import fs from 'fs';
import path from 'path';
import ws281x from 'rpi-ws281x-native';
import {
  setDriftlessInterval,
} from 'driftless';
import { Canvas } from './Canvas';
import { debugOutput } from './debugOutput';
import { ThingProps } from './integrations/hap';
import { Scene } from './scenes/Scene';

interface DisplayOptions {
  ledCount: number,
  scenePath: string,
  sceneExtension: string,
  thingProps: ThingProps,
}

export class Display {
  private readonly canvas: Canvas;
  private scenes: Scene[];

  constructor(private options: DisplayOptions) {
    this.canvas = new Canvas(options.ledCount);
  }

  private async loadScenes() {
    return (
      await Promise.all(fs.readdirSync(this.options.scenePath)
      .filter((sceneFilename) => path.extname(sceneFilename) === `.${this.options.sceneExtension}`)
      .map((sceneFilename) => import(path.join(this.options.scenePath, sceneFilename))),
      )
    ).filter((scene) => !!scene.scene)
      .map((scene) => scene.scene);
  }

  private runTimer() {
    let frame = 0;

    // Move to .env
    const INTERVAL = 1000 / 60;
    const SCENE_DURATION = 10 * 60;

    // @TODO Add plugin sequencer
    let scene = this.scenes[0];
    let currentScene = 0;

    const { thingProps } = this.options;

    let brightness = thingProps.brightness;

    const timer = setDriftlessInterval(async () => {
      if (frame % SCENE_DURATION === 0) {
        // @TODO Make this nicer, add fade, queue, properly awaited setup call etc
        currentScene = (currentScene + 1) % this.scenes.length;
        scene = this.scenes[currentScene];

        if (scene.setup) {
          scene.setup(this.canvas, thingProps);
        }
      }

      if (brightness !== thingProps.brightness) {
        brightness = thingProps.brightness;
        ws281x.setBrightness(brightness);
      }

      scene.draw(this.canvas, frame, thingProps);

      if (process.env.DEBUG) {
        debugOutput(this.canvas.getPixels(), frame);
      }

      ws281x.render(this.canvas.getPixelsData());

      frame++;
    }, INTERVAL);
  }

  public async run() {
    this.scenes = await this.loadScenes();
    ws281x.init(this.options.ledCount);

    this.runTimer();
  }
}
