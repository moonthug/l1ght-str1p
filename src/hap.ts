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

import { ThingsProps } from './index';

export function createHapService(props: ThingsProps) {
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
    pincode: '000-00-000',
    port: 45000,
    category: Categories.LIGHTBULB,
  });
}
