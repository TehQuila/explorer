import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RenderingContextService } from './rendering-context/rendering-context.service';
import { CanvasObject } from './rendering/canvas-object';
import { RelationObject } from '../component-tree/rendering/relation-object'
import { RenderSettings } from "./rendering/render-settings";
import { throwError } from "rxjs";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas', {static: true})
  canvasRef!: ElementRef;
  private canvas!: HTMLCanvasElement;

  private offset!: [number, number]; // offset of html canvas
  private objects: Map<number, CanvasObject>;

  private debugging = true;

  private focusedObjID: number;
  private dragging: boolean;
  private panning: boolean;
  private lastMousePos: [number, number];

  private readonly zoomFactor: number; // amount of zoom per scroll
  private readonly maxScale: number;
  private readonly minScale: number;

  // viewport in ctx-coords
  relations: Array<RelationObject>;  // todo: refactor
  public get vpOrigin(): [number, number] { return [-this.ctxService.ctxOrigin[0], -this.ctxService.ctxOrigin[1]]; }
  public get vpDims(): [number, number] { return [this.canvas.width / this.ctxService.scale, this.canvas.height / this.ctxService.scale]; }
  public get vpCenter(): [number, number] { return [this.vpOrigin[0] + this.vpDims[0] / 2, this.vpOrigin[1] + this.vpDims[1] / 2]; }

  constructor(private ctxService: RenderingContextService) {
    this.objects = new Map<number, CanvasObject>();
    this.relations = new Array<RelationObject>();  // todo: refactor
    this.panning = false;
    this.dragging = false;
    this.lastMousePos = [0, 0];
    this.focusedObjID = -1

    this.zoomFactor = 0.1;
    this.maxScale = 2;
    this.minScale = 0.5;
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 900; // window.innerWidth;
    this.canvas.height = 900; // window.innerHeight;

    // get bounding box of canvas element in html coords
    const canvasBbox: ClientRect = this.canvas.getBoundingClientRect();
    this.offset = [canvasBbox.left, canvasBbox.top];

    const ctx = this.canvas.getContext('2d');
    if (ctx != null) {
      this.ctxService.context = ctx
    } else {
      throwError("rendering context was null")
    }
    this.ctxService.translate(this.vpCenter);
  }

  onMouseDown(event: MouseEvent) {
    this.focusedObjID = this.getObjectID(event);

    if (this.focusedObjID === -1) {
      this.panning = true;
    } else {
      this.dragging = true;
    }

    this.lastMousePos = this.getMouseCoords(event);
  }

  onMouseUp(event: MouseEvent) {
    if (this.dragging) {
      this.dragging = false;
      this.focusedObjID = -1;
    } else {
      this.panning = false;
    }
  }

  onMouseMove(event: MouseEvent) {
    const mousePos = this.getMouseCoords(event);
    const pan: [number, number] = [mousePos[0] - this.lastMousePos[0], mousePos[1] - this.lastMousePos[1]];

    if (this.panning) {
      this.ctxService.translate(pan);
      this.redrawCanvas();
    } else if (this.dragging) {
      const obj = this.objects.get(this.focusedObjID);
      if (obj != undefined) {
        obj.translate(pan);
        this.redrawCanvas();
      }
    }

    this.lastMousePos = mousePos;
  }

  redrawCanvas() {
    this.ctxService.context.clearRect(this.vpOrigin[0], this.vpOrigin[1], this.vpDims[0], this.vpDims[1]);

    if (this.debugging) {
      this.drawGrid();
      this.drawContextOrigin();
      this.drawViewportCenter();
    }

    // todo: refactor
    /*
    this.relations.forEach(rel => {
      rel.draw(this.ctxService.context);
    });
     */

    for (const [, obj] of this.objects) {
        if (obj.isVisible(this.vpOrigin, this.vpDims)) {
          this.ctxService.draw(obj);
        }
    }
  }

  // initializes the passed canvas-object and draws it onto canvas
  public addObject(obj: CanvasObject) {
    obj.settings = new RenderSettings()
    obj.buffer = document.createElement('canvas');
    obj.drawOnBuffer(this.debugging);

    this.objects.set(obj.gid, obj);
    this.redrawCanvas();
  }

  // returns the gid of the canvas-object that
  private getObjectID(event: MouseEvent): number {
    const mousePos = this.convertHtmlCoordsToCtxCoords(this.getMouseCoords(event));

    for (const [gid, obj] of this.objects) {
      if (obj.isUnder(mousePos)) {
        return gid
      }
    }

    return -1;
  }

  // return mouse coords in html-coords
  private getMouseCoords(event: MouseEvent | WheelEvent): [number, number] {
    return [event.clientX - this.offset[0], event.clientY - this.offset[1]];
  }

  // translate html-coords into ctx-coords
  public convertHtmlCoordsToCtxCoords(point: [number, number]): [number, number] {
    return [this.vpOrigin[0] + point[0] / this.ctxService.scale, this.vpOrigin[1] + point[1] / this.ctxService.scale];
  }

  // draws the ctx-origin in html coords
  private drawContextOrigin() {
    const ctx = this.ctxService.context;
    // print coords
    const coords = '(' + this.ctxService.ctxOrigin[0] + ', ' + this.ctxService.ctxOrigin[1] + ')';
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.font = 10 + 'px sans-serif';
    ctx.fillText(coords, 5, 5);
    ctx.restore();

    // drawOnBuffer abscissa
    ctx.beginPath();
    ctx.moveTo(this.vpOrigin[0], 0);
    ctx.lineTo(this.vpOrigin[0] + this.vpDims[0], 0);
    ctx.closePath();

    ctx.save();
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
    ctx.restore();

    // drawOnBuffer ordinate
    ctx.beginPath();
    ctx.moveTo(0, this.vpOrigin[1]);
    ctx.lineTo(0, this.vpOrigin[1] + this.vpDims[1]);
    ctx.closePath();

    ctx.save();
    ctx.strokeStyle = '#00FF00';
    ctx.stroke();
    ctx.restore();
  }

  private drawViewportCenter() {
    const ctx = this.ctxService.context;

    // print coordinates
    const coords = '(' + this.vpCenter[0] + ', ' + this.vpCenter[1] + ')';
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.font = 10 + 'px sans-serif';
    ctx.fillText(coords, this.vpCenter[0] + 5, this.vpCenter[1] + 5);

    // drawOnBuffer abscissa
    ctx.beginPath();
    ctx.moveTo(this.vpCenter[0] - 50, this.vpCenter[1]);
    ctx.lineTo(this.vpCenter[0] + 50, this.vpCenter[1]);

    // drawOnBuffer ordinate
    ctx.moveTo(this.vpCenter[0], this.vpCenter[1] - 50);
    ctx.lineTo(this.vpCenter[0], this.vpCenter[1] + 50);
    ctx.closePath();

    ctx.stroke();
    ctx.restore();
  }

  private drawGrid() {
    const gridOptions = {
      minorLines: {
        separation: 5,
        color: '#d8d8d8'
      },
      majorLines: {
        separation: 30,
        color: '#b8b8b8'
      }
    };

    this.drawGridLines(gridOptions.minorLines);
    this.drawGridLines(gridOptions.majorLines);
  }

  private drawGridLines(lineOptions: any) {
    const ctx = this.ctxService.context;

    ctx.save();
    ctx.strokeStyle = lineOptions.color;
    ctx.lineWidth = 1;

    let x;
    let y;

    ctx.beginPath();
    let lineCount = Math.floor(this.vpDims[0] / lineOptions.separation);
    for (let i = 1; i <= lineCount; i++) {
      x = (i * lineOptions.separation);
      ctx.moveTo(this.vpOrigin[0] + x, this.vpOrigin[1]);
      ctx.lineTo(this.vpOrigin[0] + x, this.vpOrigin[1] + this.vpDims[1]);
    }
    lineCount = Math.floor(this.vpDims[1] / lineOptions.separation);
    for (let i = 1; i <= lineCount; i++) {
      y = (i * lineOptions.separation);
      ctx.moveTo(this.vpOrigin[0], this.vpOrigin[1] + y);
      ctx.lineTo(this.vpOrigin[0] + this.vpDims[0], this.vpOrigin[1] + y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}
