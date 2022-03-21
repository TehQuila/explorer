import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasComponent } from "./canvas/canvas.component";
import { ComponentTreeComponent } from "./component-tree/component-tree.component";
import { HttpClientModule } from "@angular/common/http";
import { RenderingContextService } from "./canvas/rendering-context/rendering-context.service";
import { LayoutService } from "./layout-service/layout.service";

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ComponentTreeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    RenderingContextService,
    LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
