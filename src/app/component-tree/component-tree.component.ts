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
      rels.push([rel.from, rel.to])
    }
    console.log(dims)
    console.log(rels)

    this.layoutService.getLayout(dims, rels).subscribe((res) => {
      console.log(res)
      const layt = new Map(Object.entries(res))
      for (const comp of this.current.components) {
        comp.pos = layt.get(comp.gid.toString())
      }
      this.canvas.redrawCanvas()
    })
  }

  private initializeComponentTree(current: ComponentObject) {
    this.canvas.addObject(current)

    for (let c of current.components) {
      this.initializeComponentTree(c)
    }

    // todo: refactor
    for (let r of current.relations) {
      this.canvas.relations.push(r)
    }
  }
}
