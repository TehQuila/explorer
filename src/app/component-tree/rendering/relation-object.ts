// todo: make compatible with canvas object
export class RelationObject {
  from: number;
  to: number;
  path: number[][];
  type: string;
  stereotype: string

  constructor(from: number, to: number, path: number[][], type: string, stereotype: string) {
    this.from = from
    this.to = to
    this.path = path
    this.type = type
    this.stereotype = stereotype
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.path[0][0], this.path[0][1]);
    ctx.lineTo(this.path[1][0], this.path[1][1]);
    ctx.stroke();
  }
}
