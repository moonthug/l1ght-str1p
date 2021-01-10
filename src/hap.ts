import {
  Accessory,
  Categories,
  Characteristic,
  CharacteristicEventTypes,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  Service,
  uuid,
} from 'hap-nodejs';

export interface ThingProps {
  brightness: number,
  color: string,
  on: boolean,
}

export function createHapService(props: ThingProps) {
  const accessoryUuid = uuid.generate('rodeo.polyglot.l1ght-str1p');
  const accessory = new Accessory('l1ght-str1p', accessoryUuid);
  const lightService = new Service.Lightbulb('l1ght-str1p');

  const onCharacteristic = lightService.getCharacteristic(Characteristic.On);
  const brightnessCharacteristic = lightService.getCharacteristic(Characteristic.Brightness);
  const hueCharacteristic = lightService.getCharacteristic(Characteristic.Hue);


  onCharacteristic.on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
    callback(undefined, props.on);
  });
  onCharacteristic.on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    props.on = value as boolean;
    callback();
  });

  brightnessCharacteristic.on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
    callback(undefined, props.brightness);
  });
  brightnessCharacteristic.on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    props.brightness = value as number;
    callback();
  });

  hueCharacteristic.on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
    callback(undefined, props.color);
  });
  hueCharacteristic.on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
    props.color = value as string;
    console.log(value);
    callback();
  });

  accessory.addService(lightService);

  accessory.publish({
    username: '11:22:33:44:55:66',
    pincode: '031-45-154',
    port: 45000,
    category: Categories.LIGHTBULB,
  });
}
