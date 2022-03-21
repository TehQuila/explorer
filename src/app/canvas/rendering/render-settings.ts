export class RenderSettings {
  readonly edgeSpace: number;
  readonly textSpace: number;
  readonly fontColor: string;
  readonly fontSize: number;
  readonly lineWidth: number;
  readonly background: string

  constructor() {
    this.edgeSpace = 7;
    this.textSpace = 10;
    this.fontColor = '#000000';
    this.fontSize = 8;
    this.lineWidth = 1;
    this.background = '#FFFFFF';
  }
}
