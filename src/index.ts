import ws281x from 'rpi-ws281x-native';
import {
  setDriftlessInterval,
} from 'driftless';
import { Canvas } from './Canvas';

import { noise } from './scenes/noise';
import { nightrider } from './scenes/nightrider';
import { webthings } from './scenes/webthings';
import { wobbler } from './scenes/wobbler';
import { weather } from './scenes/weather';

import { debugOutput } from './debugOutput';
import { createHapService } from './hap';

const INTERVAL = 1000 / 60;
const SCENE_DURATION = 10 * 60;

const scenes = [
  noise,
  nightrider,
  wobbler,
];

export interface ThingsProps {
  brightness: number,
  color: string,
  on: boolean,
}

async function main() {
  const thingsProps = {
    brightness: 100,
    color: '#000000',
    on: false,
  };

  const server = createHapService(thingsProps);

  // Start SPI
  ws281x.init(120);

  // Setup Light Canvas
  const canvas = new Canvas(120);
  let frame = 0;

  // @TODO Add plugin sequencer
  let scene = scenes[0];
  let currentScene = 0;

  let brightness = thingsProps.brightness;

  const timer = setDriftlessInterval(async () => {
    if (frame % SCENE_DURATION === 0) {
      // @TODO Make this nicer, add fade, queue, properly awaited setup call etc
      currentScene = (currentScene + 1) % scenes.length;
      scene = scenes[currentScene];

      if (scene.setup) {
        scene.setup(canvas, thingsProps);
      }
    }

    if (brightness !== thingsProps.brightness) {
      brightness = thingsProps.brightness;
      ws281x.setBrightness(brightness);
    }

    scene.draw(canvas, frame, thingsProps);

    if (process.env.DEBUG) {
      debugOutput(canvas.getPixels(), frame);
    }

    ws281x.render(canvas.getPixelsData());

    frame++;
  }, INTERVAL);
}

process.title = 'l1ght-str1p';
process.on('SIGINT', () => {
  ws281x.reset();
  process.exit(0);
});

// tslint:disable-next-line:no-console
main().catch(console.error);
