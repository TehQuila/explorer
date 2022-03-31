import {CanvasObject} from "../../canvas/rendering/canvas-object";
import {RenderSettings} from "../../canvas/rendering/render-settings";
import {throwError} from "rxjs";

export class RelationObject implements CanvasObject {
  gid: number;
  fromGid: number;
  toGid: number;
  pathGlobal: number[][];
  type: string;
  stereotype: string

  bufferCanvas!: HTMLCanvasElement;
  renderSettings!: RenderSettings;

  constructor(gid: number, from: number, to: number, path: number[][], type: string, stereotype: string) {
    this.gid = gid
    this.fromGid = from
    this.toGid = to
    this.pathGlobal = path
    this.type = type
    this.stereotype = stereotype
  }

  set buffer(b: HTMLCanvasElement) { this.bufferCanvas = b }
  get buffer(): HTMLCanvasElement { return this.bufferCanvas }

  set settings(s: RenderSettings) { this.renderSettings = s }
  get settings(): RenderSettings { return this.renderSettings }

  get id(): number { return this.gid }
  get x(): number { return Math.min(this.pathGlobal[0][0], this.pathGlobal[1][0]); }
  get y(): number { return Math.min(this.pathGlobal[0][1], this.pathGlobal[1][1]); }
  get pos(): number[] { return [this.x, this.y]; }
  get w(): number { return this.bufferCanvas.width; }
  get h(): number { return this.bufferCanvas.height; }
  get dims(): [number, number] { return [this.w, this.h]; }

  drawOnBuffer(debugging: boolean): void {
    this.bufferCanvas.width = Math.abs(this.pathGlobal[0][0] - this.pathGlobal[1][0]);
    this.bufferCanvas.height = Math.abs(this.pathGlobal[0][1] - this.pathGlobal[1][1]);

    console.log("from (" + this.pathGlobal[0][0] + "," + this.pathGlobal[0][1] + ")" + " to (" + this.pathGlobal[1][0] + "," + this.pathGlobal[1][1] + ")")

    let ctx = this.bufferCanvas.getContext('2d')
    if (ctx != null) {
      // make background transparent

      ctx.save();
      /*
      ctx.fillStyle = this.renderSettings.background;
      ctx.fillRect(0, 0, this.w, this.h);
      ctx.fillStyle = this.renderSettings.fontColor
       */

      // convert path with global coordinates
      const minX = Math.min(this.pathGlobal[0][0], this.pathGlobal[1][0]);
      const minY = Math.min(this.pathGlobal[0][1], this.pathGlobal[1][1]);
      let pathLocal = [
        [this.pathGlobal[0][0]-minX, this.pathGlobal[0][1]-minY],
        [this.pathGlobal[1][0]-minX, this.pathGlobal[1][1]-minY]
      ]

      ctx.beginPath(); // this need to be translated so that min(X0
      ctx.moveTo(pathLocal[0][0], pathLocal[0][1]);
      for (let i = 1; i < pathLocal.length; i++) {
        ctx.lineTo(pathLocal[i][0], pathLocal[i][1]);
      }
      ctx.stroke();
      ctx.restore();
    } else {
      throwError(() => new Error("Rendering Context not initialized."))
    }
  }

  translate(pan: [number, number]): void {
    this.pathGlobal[0][0] += pan[0];
    this.pathGlobal[1][0] += pan[0];
    this.pathGlobal[0][1] += pan[1];
    this.pathGlobal[1][1] += pan[1];
  }

  moveTo(point: [number, number]): void { }

  // todo: bounding box for mouse over on line
  isUnder(point: [number, number]): boolean {
    const pointWithinWidth = this.x <= point [0] && point[0] <= this.x + this.w;
    const pointWithinHeight = this.y <= point[1] && point[1] <= this.y + this.h;
    const under = pointWithinWidth && pointWithinHeight
    if (under) {
      console.log("mouse over " + this.gid)
    }
    return under;
  }

  isVisible(vpOrigin: [number, number], vpDims: [number, number]): boolean {
    return true
  }
}
