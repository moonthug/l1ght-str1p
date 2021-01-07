import { Canvas } from '../Canvas';
import { ThingsProps } from '../index';

export interface PluginOptions {
}

export interface Plugin<T = unknown> {
  data?: T,
  options?: PluginOptions,
  setup?(canvas: Canvas, thingsProps: ThingsProps): void,
  draw?(canvas: Canvas, frame: number, thingsProps: ThingsProps): void,
}
