import { Injectable } from '@angular/core';
import { CanvasObject } from "../rendering/canvas-object";

@Injectable({providedIn: 'root'})
export class RenderingContextService {
  private ctx!: CanvasRenderingContext2D;
  public set context(value: CanvasRenderingContext2D) { this.ctx = value; }
  public get context(): CanvasRenderingContext2D { return this.ctx; }

  // position of context origin: scaled and translated
  private origin: [number, number];
  public get ctxOrigin(): [number, number] { return [this.origin[0], this.origin[1]]; }

  // current scale of ctx
  private scl: number;
  public get scale(): number { return this.scl; }

  constructor() {
    this.origin = [0, 0];
    this.scl = 1;
  }

  public translate(pan: [number, number]) {
    this.ctx.translate(pan[0], pan[1]);
    this.origin[0] += pan[0];
    this.origin[1] += pan[1];
  }

  // zooms to point "scaling" current scale by zoom
  // todo: prevent coords from being floating point numbers
  public zoomTo(point: [number, number], zoom: number) {
    const newScale = this.scl * zoom;
    const scaleChange = -(newScale - this.scl);

    this.ctx.scale(zoom, zoom);
    this.scl = newScale;
    this.origin[0] /= zoom;
    this.origin[1] /= zoom;

    const pan = [point[0] * scaleChange / this.scl, point[1] * scaleChange / this.scl];
    this.ctx.translate(pan[0], pan[1]);
    this.origin[0] += pan[0];
    this.origin[1] += pan[1];
  }

  public draw(obj: CanvasObject) {
    this.ctx.drawImage(obj.bufferCanvas, obj.x, obj.y);
  }
}
