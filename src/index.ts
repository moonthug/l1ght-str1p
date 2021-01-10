import { noise } from './scenes/noise';
import { nightrider } from './scenes/nightrider';
import { webthings } from './scenes/webthings';
import { test } from './scenes/test';
import { wobbler } from './scenes/wobbler';
import { weather } from './scenes/weather';

import { createHapService } from './hap';
import { Display } from './Display';

const scenes = [
  // test,
  noise,
  nightrider,
  wobbler,
];

async function main() {
  const thingProps = {
    brightness: 100,
    color: '#000000',
    on: false,
  };

  const hapService = createHapService(thingProps);

  const display = new Display(
    120,
    scenes,
    thingProps,
  );

  display.run();
}

process.title = 'l1ght-str1p';
process.on('SIGINT', () => {
  //ws281x.reset();
  process.exit(0);
});

// tslint:disable-next-line:no-console
main().catch(console.error);
