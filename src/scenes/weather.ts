import axios from 'axios';
import { Scene } from './Scene';

interface WeatherData {
  error?: boolean,
  type: string,
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

export const weather: Scene<WeatherData> = {
  data: {
    type: '',
  },
  async setup(canvas) {
    try {
      const { data } = await axios('http://api.openweathermap.org/data/2.5/weather?q=knipton&appid=b9fe737f470c68b3273c8a8e494ac8e4') as OpenWeatherMapResponse;
      weather.data = {
        error: false,
        type: data.weather[0].main,
      };
    } catch (e) {
      weather.data.error = true;
    }
  },
  draw(canvas, frame) {
    const { error, type } = weather.data;

    if (type === 'Rain') {
      canvas.fill([0, 0, 255]);
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
