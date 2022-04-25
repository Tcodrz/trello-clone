import { UICardModule } from './../../../../../../libs/ui-components/src/lib/card/card.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsPreviewListModule } from '../board/boards-preview-list/boards-preview-list.module';
import { LayoutModule } from './../layout/layout.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';



@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    BoardsPreviewListModule,
    UICardModule,
    CommonModule,
    LayoutModule,
    WorkspaceRoutingModule,
  ]
})
export class WorkspaceModule { }
