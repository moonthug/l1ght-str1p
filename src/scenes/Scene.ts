import { Canvas } from '../Canvas';
import { ThingsProps } from '../index';

export interface SceneOptions {
  duration: number;
}

export interface Scene<T = unknown> {
  data?: T,
  options?: SceneOptions,
  setup?(canvas: Canvas, thingsProps: ThingsProps): void,
  draw?(canvas: Canvas, frame: number, thingsProps: ThingsProps): void,
}
