import path from 'path';
import { createHapService } from './integrations/hap';
import { L1ghtStr1p } from './L1ghtStr1p';


async function main() {
  const thingProps = {
    brightness: 100,
    color: '#000000',
    on: false,
  };

  const hapService = createHapService(thingProps);

  const l1ghtStr1p = new L1ghtStr1p({
    ledCount: parseInt(process.env.LED_COUNT, 10) || 120,
    frameRate: parseInt(process.env.FRAME_RATE, 10) || 30,
    scenePath: path.resolve(process.env.SCENE_PATH || './scenes'),
    sceneExtension: process.env.SCENE_EXT || 'js',
    thingProps,
  });

  await l1ghtStr1p.start();
}

process.title = 'l1ght-str1p';
process.on('SIGINT', () => {
  process.exit(0);
});

// tslint:disable-next-line:no-console
main().catch(console.error);
