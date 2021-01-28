import axios, { AxiosResponse } from 'axios';
import { Canvas } from '../Canvas';
import { Scene } from './Scene';

interface WeatherData {
  error?: boolean,
  type?: string,
}

interface OpenWeatherMapResponse {
  data: {
    weather: [
      {
        main: string,
        description: string,
      }
    ],
  },
}

export const scene: Scene<WeatherData> = {
  data: {
    type: '',
  },
  setup(canvas: Canvas) {
    canvas.fill([255, 255, 255]);

    axios('http://api.openweathermap.org/data/2.5/weather?q=knipton&appid=b9fe737f470c68b3273c8a8e494ac8e4')
      .then((response: AxiosResponse) => {
        canvas.fill([0, 255, 0]);
        scene.data = {
          error: false,
          type: response.data.weather[0].main,
        };
      })
      .catch((e) => {
        console.log(e);
        scene.data = {
          error: true,
        };
      });
  },
  draw(canvas, frame) {
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
  },
};
