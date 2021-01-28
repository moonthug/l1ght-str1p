import ws281x from 'rpi-ws281x-native';
import { Canvas } from './Canvas';
import { debugOutput } from './debugOutput';
import { ThingProps } from './integrations/hap';
import { Scene } from './scenes/Scene';

interface DisplayOptions {
  ledCount: number,
  thingProps: ThingProps,
  sceneDuration: number,
  crossFadeDuration: number,
}

export class Display {

  private readonly canvas: Canvas;
  private scenes: Scene[];
  private currentSceneIndex: number;
  private currentFrame: number;

  constructor(private options: DisplayOptions) {
    this.canvas = new Canvas(options.ledCount);
    this.currentFrame = 0;
  }

  private setupCurrentScene() {
    if (this.scenes[this.currentSceneIndex].setup) {
      this.scenes[this.currentSceneIndex].setup(this.canvas, this.options.thingProps);
    }
  }

  public setup(scenes: Scene[]) {
    this.scenes = scenes;
    this.currentSceneIndex = 0;

    this.setupCurrentScene();
  }

  public draw() {
    if (this.scenes.length > 1) {
      if (this.currentFrame % this.options.sceneDuration === 0 && this.currentFrame !== 0) {

        // Change Frame
        this.currentSceneIndex = (this.currentSceneIndex + 1) % this.scenes.length;
        this.setupCurrentScene();
      }
    }

    if (process.env.DEBUG) {
      debugOutput(this.canvas.getPixels(), this.currentFrame);
    }

    this.scenes[this.currentSceneIndex]
      .draw(this.canvas, this.currentFrame, this.options.thingProps);

    ws281x.render(this.canvas.getPixelsData());

    this.currentFrame++;
  }
}
