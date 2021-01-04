import { Canvas } from '../Canvas';
import { WebThingProps } from '../webthing';

export interface PluginOptions {
}

export interface Plugin<T = unknown> {
  data?: T,
  options?: PluginOptions,
  setup?(canvas: Canvas, webThingsProps: WebThingProps): void,
  draw?(canvas: Canvas, frame: number, webThingsProps: WebThingProps): void,
}
