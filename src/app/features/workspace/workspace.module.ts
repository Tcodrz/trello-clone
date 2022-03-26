import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsPreviewListModule } from './../../ui-components/boards-preview-list/boards-preview-list.module';
import { CardModule } from './../../ui-components/card/card.module';
import { LayoutModule } from './../layout/layout.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';



@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    BoardsPreviewListModule,
    CardModule,
    CommonModule,
    LayoutModule,
    WorkspaceRoutingModule,
  ]
})
export class WorkspaceModule { }
