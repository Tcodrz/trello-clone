import { ButtonModule } from './../../../../../../../libs/ui-components/src/lib/button/button.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { WorkspacePreviewComponent } from './workspace-preview/workspace-preview.component';
import { PreviewCardListModule } from "@ui-components";

@NgModule({
  declarations: [
    BoardsComponent,
    WorkspacePreviewComponent,
  ],
	imports: [
    BoardsRoutingModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    PreviewCardListModule
  ],
})
export class BoardsModule {}
