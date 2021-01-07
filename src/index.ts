import ws281x from 'rpi-ws281x-native';
import {
  setDriftlessInterval,
} from 'driftless';
import { Canvas } from './Canvas';

import { noise } from './plugins/noise';
import { webthings } from './plugins/webthings';
import { wobbler } from './plugins/wobbler';
import { weather } from './plugins/weather';
import { debugOutput } from './debugOutput';
import { createHapService } from './hap';

const INTERVAL = 1000 / 24;
const PLUGIN_DURATION = 10 * 24;

const plugins = [
  noise,
  wobbler,
];

export interface ThingsProps {
  brightness: number,
  color: string,
  on: boolean,
}

async function main() {
  const remoteSettings = {};

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
  let plugin = plugins[0];
  let currentPlugin = 0;

  const timer = setDriftlessInterval(async () => {
    if (frame % PLUGIN_DURATION === 0) {
      // @TODO Make this nicer, add fade, queue, properly awaited setup call etc
      currentPlugin = (currentPlugin + 1) % plugins.length;
      plugin = plugins[currentPlugin];
      plugin.setup(canvas, thingsProps);
    }

    plugin.draw(canvas, frame, thingsProps);

    debugOutput(canvas.getPixels(), frame);

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
