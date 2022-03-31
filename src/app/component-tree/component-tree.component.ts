import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CanvasComponent } from "../canvas/canvas.component";
import { ParserService } from "../parser/parser.service";
import { ComponentObject } from "./rendering/component-object";
import { LayoutService } from "../layout-service/layout.service";

@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css']
})
export class ComponentTreeComponent implements AfterViewInit {
  @ViewChild(CanvasComponent, { static: true })
  canvas!: CanvasComponent;

  private current!: ComponentObject;

  constructor(private parserService: ParserService, private layoutService: LayoutService) {}

  ngAfterViewInit(): void {
    // initialize canvas
    this.current = this.parserService.getComponentTree()
    this.initializeComponentTree(this.current)

    // request layout
    const dims = new Map<number, [number, number]>();
    for (const comp of this.current.components) {
      dims.set(comp.gid, comp.dims)
    }
    const rels = new Array<[number, number]>();
    for (const rel of this.current.relations) {
      rels.push([rel.fromGid, rel.toGid])
    }

    this.layoutService.getLayout(dims, rels).subscribe((res) => {
      const layt = new Map(Object.entries(res))

      for (const comp of this.current.components) {
        comp.pos = layt.get(comp.gid.toString())
        console.log("pos=(" + comp.pos + ")")
      }

      for (let rel of this.current.relations) {
        // todo: connect to components positions
        // const from = this.current.getSubComponent(rel.fromGid)
        //  const to = this.current.getSubComponent(rel.toGid)
        const fromPos = layt.get(rel.fromGid.toString())
        const toPos = layt.get(rel.toGid.toString())
        rel.pathGlobal[0] = [Number(fromPos[0]), Number(fromPos[1])]
        rel.pathGlobal[1] = [Number(toPos[0]), Number(toPos[1])]

        this.canvas.addObject(rel)
      }

      this.canvas.redrawCanvas()
    })
  }

  private initializeComponentTree(current: ComponentObject) {
    this.canvas.addObject(current)

    for (let c of current.components) {
      this.initializeComponentTree(c)
    }
  }
}
