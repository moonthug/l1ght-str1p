import { Canvas } from '../Canvas';
import { ThingProps } from '../integrations/hap';

export interface SceneOptions {
  duration: number,
}

export interface Scene<T = unknown> {
  data?: T,
  options?: SceneOptions,
  setup?(canvas: Canvas, thingProps: ThingProps): void,
  draw(canvas: Canvas, frame: number, thingProps: ThingProps): void,
}
