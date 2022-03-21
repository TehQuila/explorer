import { RenderSettings } from "../../canvas/rendering/render-settings";
import { CanvasObject } from "../../canvas/rendering/canvas-object";

export abstract class ComponentTreeObject implements CanvasObject {
  gid: number;
  lid: number;
  name: string;
  qual_name: string;
  coords: number[];

  bufferCanvas!: HTMLCanvasElement;
  renderSettings!: RenderSettings;

  protected constructor(gid: number, lid: number, name: string, qual_name: string, coords: number[]) {
    this.gid = gid
    this.lid = lid
    this.name = name
    this.qual_name = qual_name
    this.coords = coords
  }

  set buffer(b: HTMLCanvasElement) { this.bufferCanvas = b }
  get buffer(): HTMLCanvasElement { return this.bufferCanvas }

  set settings(s: RenderSettings) { this.renderSettings = s }
  get settings(): RenderSettings { return this.renderSettings }

  get x(): number { return this.coords[0] }
  set x(val: number) { this.coords[0] = val; }
  get y(): number { return this.coords[1] }
  set y(val: number) { this.coords[1] = val; }
  get pos(): number[] { return [this.x, this.y]; }
  set pos(val: number[]) { this.x = val[0]; this.y = val[1]; }
  get w(): number { return this.bufferCanvas.width; }
  get h(): number { return this.bufferCanvas.height; }
  get dims(): [number, number] { return [this.w, this.h]; }

  public translate(pan: [number, number]): void {
    this.x += pan[0];
    this.y += pan[1];
  }

  public moveTo(point: [number, number]): void {
    this.x = point[0];
    this.y = point[1];
  }

  public isUnder(point: [number, number]): boolean {
    const pointWithinWidth = this.x <= point [0] && point[0] <= this.x + this.w;
    const pointWithinHeight = this.y <= point[1] && point[1] <= this.y + this.h;
    return pointWithinWidth && pointWithinHeight;
  }

  // returns true if overlaps with given viewport
  isVisible(vpOrigin: [number, number], vpDims: [number, number]): boolean {
    return !(vpOrigin[0] > this.x + this.w || vpOrigin[0] + vpDims[0] < this.x
      || vpOrigin[1] > this.y + this.h || vpOrigin[1] + vpDims[1] < this.y);
  }

  abstract drawOnBuffer(debugging: boolean): void;
}
