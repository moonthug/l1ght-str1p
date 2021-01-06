import { Property, SingleThing, Thing, Value, WebThingServer } from 'webthing/webthing';


export interface WebThingProps {
  brightness: number,
  color: string,
  on: boolean,
}

function createWebThing(props: WebThingProps): Thing {
  const thing = new Thing('urn:dev:ops:l1ght-str1p',
    'L1ght Str1p',
    ['OnOffSwitch', 'Light'],
    'A web connected lamp');

  thing.addProperty(
    new Property(thing,
      'on',
      new Value(true, (on: boolean) => props.on = on),
      {
        '@type': 'OnOffProperty',
        title: 'On/Off',
        type: 'boolean',
        description: 'Whether the lamp is turned on',
      }));

  thing.addProperty(
    new Property(thing,
      'brightness',
      new Value(50, (brightness: number) => props.brightness = brightness),
      {
        '@type': 'BrightnessProperty',
        title: 'Brightness',
        type: 'integer',
        description: 'The level of light from 0-100',
        minimum: 0,
        maximum: 100,
        unit: 'percent',
      }));

  thing.addProperty(
    new Property(thing,
      'color',
      new Value('#000000', (color: string) => props.color = color),
      {
        '@type': 'ColorProperty',
        title: 'Color',
        type: 'string',
        description: 'The light colour',
      }));

  // thing.addAvailableAction(
  //   'fade',
  //   {
  //     title: 'Fade',
  //     description: 'Fade the lamp to a given level',
  //     input: {
  //       type: 'object',
  //       required: [
  //         'brightness',
  //         'duration',
  //       ],
  //       properties: {
  //         brightness: {
  //           type: 'integer',
  //           minimum: 0,
  //           maximum: 100,
  //           unit: 'percent',
  //         },
  //         duration: {
  //           type: 'integer',
  //           minimum: 1,
  //           unit: 'milliseconds',
  //         },
  //       },
  //     },
  //   },
  //   FadeAction);

  thing.addAvailableEvent(
    'overheated',
    {
      description: 'The lamp has exceeded its safe operating temperature',
      type: 'number',
      unit: 'degree celsius',
    });

  return thing;
}

export function createWebThingServer(props: WebThingProps, port: number, address = '0.0.0.0') {
  const thing = createWebThing(props);
  return new WebThingServer(new SingleThing(thing), port, address);
}
