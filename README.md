# L1ght-Str1p

---

[![Codeship Status for moonthug/l1ght-str1p](https://app.codeship.com/projects/588bf1d5-3bcd-4726-b006-50f243e2cf91/status?branch=master)](https://app.codeship.com/projects/423215)

The light strip in my lounge.

## Features
- Runs on a Raspberry Pi Zero
- CI/CD integration
- Plugin interface
- IOT (Homekit) compatibility

###

#### Weather Example

```typescript
import axios, { AxiosResponse } from 'axios';
import { Canvas } from '../Canvas';
import { Scene } from './Scene';

interface WeatherData {
  error?: boolean;
  type?: string;
}

interface OpenWeatherMapResponse {
  weather: [
    {
      main: string;
      description: string;
    }
  ];
}

export const scene: Scene<WeatherData> = {
  data: {
    type: ''
  },
  setup (canvas: Canvas) {
    axios('http://api.openweathermap.org/data/2.5/weather?q=<LOCATION>&appid=<APP_ID>')
      .then((response: AxiosResponse<OpenWeatherMapResponse>) => {
        scene.data = {
          error: false,
          type: response.data.weather[0].main
        };
      })
      .catch((e) => {
        console.log(e);
        scene.data = {
          error: true
        };
      });
  },
  draw (canvas, frame) {
    const { error, type } = scene.data;

    canvas.clear();

    if (type === 'Rain') {
      canvas.gradient(0, canvas.getLength(), [0, 50, 255], [0, 128, 255]);
    } else if (type === 'Clouds') {
      canvas.fill([50, 50, 50]);
    } else {
      canvas.fill([0, 0, 0]);
    }

    if (error) {
      canvas.fill([255, 0, 0]);
    }
  }
};
```

### Debug Mode

Add the following environment variable(s) to enable debug mode. It is already included in the `start:dev` npm script

```dotenv
DEBUG=1

# Optional
FORCE_COLOR=3 # Enable colour regardless of the terminal (see https://github.com/chalk/chalk#chalksupportscolor)
```
![Debug Mode](./docs/debug.png)
