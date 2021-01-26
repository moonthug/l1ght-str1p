import path from 'path';
import { createHapService } from './integrations/hap';
import { Display } from './Display';


async function main() {
  const thingProps = {
    brightness: 100,
    color: '#000000',
    on: false,
  };

  const hapService = createHapService(thingProps);

  const display = new Display({
    ledCount: 120,
    scenePath: path.resolve(process.env.SCENE_PATH || './scenes'),
    sceneExtension: process.env.SCENE_EXT || 'js',
    thingProps,
  });

  await display.run();
}

process.title = 'l1ght-str1p';
process.on('SIGINT', () => {
  //ws281x.reset();
  process.exit(0);
});

// tslint:disable-next-line:no-console
main().catch(console.error);
