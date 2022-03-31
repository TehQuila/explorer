import { ComponentTreeObject } from './component-tree-object';
import { throwError } from "rxjs";
import { ClassObject } from "./class-object";
import { RelationObject } from "./relation-object";

export class ComponentObject extends ComponentTreeObject {
  components: ComponentObject[];
  classes: ClassObject[];
  relations: RelationObject[];

  constructor(gid: number, lid: number, name: string, qual_name: string, coords: number[],
              components: ComponentObject[], classes: ClassObject[], relations: RelationObject[]) {
    super(gid, lid, name, qual_name, coords)

    this.components = components
    this.classes = classes
    this.relations = relations
  }

  drawOnBuffer(debugging: boolean = false): void {

    const ctx = this.bufferCanvas.getContext('2d');
    if (ctx != null) {
      const w = this.calculateWidth(debugging, ctx);
      const h = this.calculateHeight(debugging, ctx);
      this.bufferCanvas.height = h;
      this.bufferCanvas.width = w;

      ctx.save();
      // background
      ctx.lineWidth = this.renderSettings.lineWidth;
      ctx.fillStyle = this.renderSettings.background;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeRect(0, 0, w, h);

      const currentWidth = this.renderSettings.lineWidth + this.renderSettings.edgeSpace;
      let currentHeight = this.renderSettings.lineWidth + this.renderSettings.edgeSpace;
      ctx.textBaseline = 'top';
      ctx.fillStyle = this.renderSettings.fontColor;

      if (debugging) {
        ctx.font = '8px JetBrains Mono';
        ctx.fillText(this.gid + ', ' + this.lid, currentWidth, currentHeight, 50);
        currentHeight += this.renderSettings.textSpace;
      }
      // name
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(this.name, currentWidth, currentHeight, w);

      ctx.restore();
    } else {
      throwError(() => new Error("Rendering Context not initialized."))
    }
  }

  public getSubComponent(gid: number): ComponentObject|null {
    for (const comp of this.components) {
      if (comp.gid == gid) {
        return comp
      }
    }
    return null
  }

  private calculateHeight(debugging: boolean, ctx: CanvasRenderingContext2D): number {
    ctx.save();
    ctx.font = '10px JetBrains Mono';
    let textMetrics = ctx.measureText(this.name);
    let h = Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent);

    if (debugging) {
      h += this.renderSettings.textSpace;
      ctx.font = '8px JetBrains Mono';
      textMetrics = ctx.measureText(this.gid + ', ' + this.lid);
      h += Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent);
    }

    h += 2 * this.renderSettings.lineWidth;
    h += 2 * this.renderSettings.edgeSpace;

    return h;
  }

  private calculateWidth(debugging: boolean, ctx: CanvasRenderingContext2D): number {
    ctx.save();
    ctx.font = '10px JetBrains Mono';
    let textMetrics = ctx.measureText(this.name);
    let w = Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight);

    if (debugging) {
      ctx.font = '8px JetBrains Mono';
      textMetrics = ctx.measureText(this.gid + ', ' + this.lid);
      const dw = Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight);
      if (dw > w) {
        w = dw;
      }
    }

    w += 2 * this.renderSettings.lineWidth;
    w += 2 * this.renderSettings.edgeSpace;

    ctx.restore();
    return w;
  }
}
