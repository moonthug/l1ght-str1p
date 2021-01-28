import axios, { AxiosResponse } from 'axios';
import { Canvas } from '../Canvas';
import { Scene } from './Scene';
import SimplexNoise from 'simplex-noise';

interface WeatherData {
  error?: boolean;
  loading: boolean;
  simplex: SimplexNoise;
  type?: string;
}

interface OpenWeatherMapResponse {
  weather: [
    {
      main: string;
    }
  ];
}

function drawLoading (canvas: Canvas, frame: number) {
  const position = frame % canvas.getLength();
  canvas.setPixel(position, [0, 255, 128]);
  canvas.fill([0, 0, 0, 50]);
}

function drawRain (canvas: Canvas) {
  const count = Math.random() * 2;
  for (let i = 0; i < count; i++) {
    canvas.setPixel(Math.floor(Math.random() * canvas.getLength()), [0, 50, 255]);
  }
  canvas.fill([0, 0, 25, 25]);
}

function drawDrizzle (canvas: Canvas) {
  canvas.setPixel(Math.floor(Math.random() * canvas.getLength()), [0, 50, 255]);
  canvas.fill([50, 50, 50, 25]);
}

function drawSnow (canvas: Canvas) {
  const count = Math.random() * 2;
  for (let i = 0; i < count; i++) {
    const position = Math.floor(Math.random() * (canvas.getLength() - 1));
    canvas.setPixel(position, [255, 255, 255]);
    canvas.setPixel(position + 1, [255, 255, 255]);
  }
  canvas.fill([150, 150, 150, 10]);
}

function drawClouds (canvas: Canvas, frame: number, simplex: SimplexNoise) {
  canvas.getPixels().forEach((pixel, index) => {
    const val = index + frame / 5;
    const rgbNoise = simplex.noise2D(val / 50, val / 50);

    const base = 50;

    canvas.setPixel(index, [
      base + Math.floor(rgbNoise * 50),
      base + Math.floor(rgbNoise * 50),
      base + Math.floor(rgbNoise * 50)
    ]);
  });
}

function drawThunder (canvas: Canvas, frame: number, simplex: SimplexNoise) {
  drawClouds(canvas, frame, simplex);

  if (Math.random() > 0.99) {
    canvas.fill([255, 255, 255]);
  }
}

function drawClear (canvas: Canvas, frame: number, simplex: SimplexNoise) {
  canvas.getPixels().forEach((pixel, index) => {
    const val = index + frame / 100;
    const bNoise = simplex.noise2D(val, val) * 50;

    canvas.setPixel(index, [
      0,
      100,
      200 + Math.floor(bNoise)
    ]);
  });

  canvas.gradient(
    0,
    canvas.getLength() / 3,
    [255, 128, 0, 255],
    [255, 255, 0, 0]
  );
}

export const scene: Scene<WeatherData> = {
  data: {
    type: '',
    loading: true,
    error: false,
    simplex: new SimplexNoise()
  },
  setup () {
    scene.data.loading = true;
    axios('http://api.openweathermap.org/data/2.5/weather?q=knipton&appid=b9fe737f470c68b3273c8a8e494ac8e4')
      .then((response: AxiosResponse<OpenWeatherMapResponse>) => {
        scene.data.error = false;
        scene.data.loading = false;
        scene.data.type = response.data.weather[0].main;
      })
      .catch((e) => {
        console.log(e);
        scene.data.error = true;
        scene.data.loading = false;
      });
  },
  draw (canvas, frame) {
    const { error, loading, type } = scene.data;

    // https://openweathermap.org/weather-conditions
    if (type === 'Clear') {
      drawClear(canvas, frame, scene.data.simplex);
    } else if (type === 'Rain') {
      drawRain(canvas);
    } else if (type === 'Drizzle') {
      drawDrizzle(canvas);
    } else if (type === 'Clouds') {
      drawClouds(canvas, frame, scene.data.simplex);
    } else if (type === 'Thunderstorm') {
      drawThunder(canvas, frame, scene.data.simplex);
    } else if (type === 'Snow') {
      drawSnow(canvas);
    } else {
      canvas.fill([0, 0, 0]);
    }

    if (loading) {
      drawLoading(canvas, frame);
    }

    if (error) {
      canvas.fill([255, 0, 0]);
    }
  }
};
