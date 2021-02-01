import axios, { AxiosResponse } from 'axios';
import { Canvas } from '../Canvas';
import { Scene } from './Scene';

interface WeatherData {
  error?: boolean;
  loading: boolean;
  value?: {
    previousClosePrice: number;
    currentPrice: number;
  };
}

interface FinnhubResponse {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

function drawLoading (canvas: Canvas, frame: number) {
  const position = frame % canvas.getLength();
  canvas.setPixel(position, [0, 255, 128]);
  canvas.fill([0, 0, 0, 50]);
}

export const scene: Scene<WeatherData> = {
  data: {
    loading: true,
    error: false
  },
  setup () {
    scene.data.loading = true;
    axios('https://finnhub.io/api/v1/quote?symbol=GME&token=c0c39tv48v6o915a1ang')
      .then((response: AxiosResponse<FinnhubResponse>) => {
        scene.data.error = false;
        scene.data.loading = false;
        scene.data.value = {
          currentPrice: response.data.c,
          previousClosePrice: response.data.pc
        };
      })
      .catch((e) => {
        console.log(e);
        scene.data.error = true;
        scene.data.loading = false;
      });
  },
  draw (canvas, frame) {
    const { error, loading, value } = scene.data;

    if (loading) {
      return drawLoading(canvas, frame);
    }

    if (error) {
      return canvas.fill([255, 0, 0]);
    }

    const halfLength = Math.floor(canvas.getLength() / 2);
    const centre = halfLength;

    const diffValue = (value.currentPrice - value.previousClosePrice) / value.previousClosePrice;
    const diffPctLightCount = Math.abs(Math.floor(halfLength * diffValue));

    canvas.clear();

    if (diffValue > 0) {
      canvas.gradient(centre, centre + diffPctLightCount, [0, 150, 0], [0, 255, 0]);
    } else {
      canvas.gradient(centre - diffPctLightCount, centre, [255, 0, 0], [150, 0, 0]);
    }

  }
};
