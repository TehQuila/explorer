import { RenderSettings } from "./render-settings";

export interface CanvasObject {
  bufferCanvas: HTMLCanvasElement;
  renderSettings: RenderSettings;

  set buffer(b: HTMLCanvasElement)
  get buffer(): HTMLCanvasElement

  set settings(s: RenderSettings)
  get settings(): RenderSettings

  get gid(): number
  get x(): number
  set x(val: number)
  get y(): number
  set y(val: number)
  get pos(): number[]
  set pos(val: number[])
  get w(): number
  get h(): number
  get dims(): [number, number]
  drawOnBuffer(debugging: boolean): void;
  translate(pan: [number, number]): void
  moveTo(point: [number, number]): void
  isUnder(point: [number, number]): boolean
  isVisible(vpOrigin: [number, number], vpDims: [number, number]): boolean
}
