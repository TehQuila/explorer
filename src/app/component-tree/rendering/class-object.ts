import {ComponentTreeObject} from './component-tree-object';
import { throwError } from "rxjs";

export class ClassObject extends ComponentTreeObject {
  methods: string[];
  attributes: string[];

  constructor(gid: number, lid: number, name: string, qual_name: string, coords: number[], attributes: string[],
              methods: string[]) {
    super(gid, lid, name, qual_name, coords)
    this.methods = methods
    this.attributes = attributes
  }

    drawOnBuffer(debugging: boolean = false): void {
      const ctx = this.bufferCanvas.getContext('2d');
      if (ctx != null) {
        const h = this.calculateHeight(ctx);
        const w = this.calculateWidth(ctx);

        // background
        ctx.save();
        ctx.fillStyle = this.renderSettings.background;
        ctx.fillRect(this.x, this.y, w, h);

        // border
        ctx.strokeRect(this.x, this.y, w, h);

        let currentHeight = this.y + this.renderSettings.lineWidth + this.renderSettings.edgeSpace;
        const textEdgeSpace = this.x + this.renderSettings.lineWidth + this.renderSettings.edgeSpace;

        // class name
        ctx.textBaseline = 'top';
        ctx.fillStyle = this.renderSettings.fontColor;
        ctx.fillText(this.name, textEdgeSpace, currentHeight);
        currentHeight += this.renderSettings.fontSize;
        currentHeight += this.renderSettings.edgeSpace;

        // separator
        ctx.moveTo(this.x, currentHeight);
        ctx.lineTo(this.x + w, currentHeight);
        ctx.stroke();
        currentHeight += this.renderSettings.lineWidth;
        currentHeight += this.renderSettings.edgeSpace;

        // inst_attrs
        if (0 < this.attributes.length) {
          for (let i = 0; i < this.attributes.length; i++) {
            ctx.fillText(this.attributes[i], textEdgeSpace, currentHeight);
            currentHeight += this.renderSettings.fontSize;
            if (i < this.attributes.length - 1) {
              currentHeight += this.renderSettings.textSpace;
            }
          }
          currentHeight += this.renderSettings.edgeSpace;
        }

        // separator
        ctx.beginPath();
        ctx.moveTo(this.x, currentHeight);
        ctx.lineTo(this.x + w, currentHeight);
        ctx.closePath();
        ctx.stroke();
        currentHeight += this.renderSettings.lineWidth;
        currentHeight += this.renderSettings.edgeSpace;

        // instMethods
        if (0 < this.methods.length) {
          for (let i = 0; i < this.methods.length; i++) {
            ctx.fillText(this.methods[i], textEdgeSpace, currentHeight);
            currentHeight += this.renderSettings.fontSize;
            if (i < this.methods.length - 1) {
              currentHeight += this.renderSettings.textSpace;
            }
          }
        }

        ctx.restore();
      } else {
        throwError(() => new Error("Rendering Context not initialized."))
      }
    }

  private calculateHeight(ctx: CanvasRenderingContext2D) {
    let h = this.renderSettings.lineWidth;
    h += this.renderSettings.edgeSpace;
    // class name
    h += this.renderSettings.fontSize;
    let textMetrics = ctx.measureText(this.name);
    h += Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent)
    h += this.renderSettings.edgeSpace;

    // separator
    h += this.renderSettings.lineWidth;
    h += this.renderSettings.edgeSpace;

    // inst_attrs
    if (0 < this.attributes.length) {
      for (let i = 0; i < this.attributes.length; i++ ) {
        h += this.renderSettings.fontSize;
        if (i < this.attributes.length - 1) {
          h += this.renderSettings.textSpace;
        }
      }
      h += this.renderSettings.edgeSpace;
    }

    // separator
    h += this.renderSettings.lineWidth;
    h += this.renderSettings.edgeSpace;

    // instMethods
    if (0 < this.methods.length) {
      for (let i = 0; i < this.methods.length; i++) {
        h += this.renderSettings.fontSize;
        if (i < this.methods.length - 1) {
          h += this.renderSettings.textSpace;
        }
      }
      h += this.renderSettings.edgeSpace;
    }

    h += this.renderSettings.lineWidth;

    return h;
  }

  private calculateWidth(ctx: CanvasRenderingContext2D) {
    let w = ctx.measureText(this.name).width;
    for (const m of this.methods) {
      w = Math.max(w, ctx.measureText(m).width);
    }
    for (const m of this.attributes) {
      w = Math.max(w, ctx.measureText(m).width);
    }

    w += 2 * this.renderSettings.lineWidth;
    w += 2 * this.renderSettings.edgeSpace;

    return w;
  }
}
