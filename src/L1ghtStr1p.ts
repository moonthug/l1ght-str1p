import fs from 'fs';
import path from 'path';
import ws281x from 'rpi-ws281x-native';
import {
  clearDriftless,
  setDriftlessInterval,
} from 'driftless';
import { debugOutput } from './debugOutput';
import { ThingProps } from './integrations/hap';
import { Display } from './Display';

interface L1ghtStr1pOptions {
  ledCount: number,
  scenePath: string,
  sceneExtension: string,
  frameRate: number,
  thingProps: ThingProps,
}

export class L1ghtStr1p {
  private readonly display: Display;
  private timerHandle: string;

  constructor(private options: L1ghtStr1pOptions) {
    this.display = new Display({
      ledCount: options.ledCount,
      thingProps: options.thingProps,
      sceneDuration: options.frameRate * 10, // 10 secs
      crossFadeDuration: options.frameRate * 2, // 2 secs
    });
  }

  private async loadScenes() {
    return (
      await Promise.all(
        fs.readdirSync(this.options.scenePath)
          .filter((sceneFilename) => {
            return path.extname(sceneFilename) === `.${this.options.sceneExtension}`
              && sceneFilename.search(/disabled/g) === -1;
            },
          )
          .map((sceneFilename) => import(path.join(this.options.scenePath, sceneFilename))),
      )
    ).filter((scene) => !!scene.scene)
      .map((scene) => scene.scene);
  }

  public async start() {
    const scenes = await this.loadScenes();
    this.display.setup(scenes);

    ws281x.init(this.options.ledCount);
    this.timerHandle = setDriftlessInterval(() => this.display.draw(), 1000 / this.options.frameRate);
  }

  public stop() {
    ws281x.reset();
    clearDriftless(this.timerHandle);
  }
}
