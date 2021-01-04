import * as PiSpi from 'pi-spi';
import {
  setDriftlessInterval,
} from 'driftless';
import { Canvas } from './Canvas';

import { noise } from './plugins/noise';
import { weather } from './plugins/weather';
import { debugOutput } from './debugOutput';
import { createWebThingServer } from './webthing';

const INTERVAL = 1000 / 24;


async function main() {
  const remoteSettings = {};

  // Start Webthings Server
  const webThingsProps = {
    brightness: 100,
    color: '#000000',
    on: false,
  };
  const server = createWebThingServer(webThingsProps, 8888);
  await server.start();

  // Start SPI
  // const spi = PiSpi.initialize('/dev/spidev0.0');

  // Setup Light Canvas
  const canvas = new Canvas(50);
  let frame = 0;

  const plugin = noise;
  await plugin.setup(canvas, webThingsProps);

  const timer = setDriftlessInterval(async () => {
    plugin.draw(canvas, frame, webThingsProps);

    debugOutput(canvas.getPixels(), frame);

    // const buffer = Buffer.from(canvas.getPixels());
    // spi.write(buffer, () => void 0);

    frame++;
  }, INTERVAL);
}

main().catch(console.error);
