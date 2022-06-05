import { ButtonModule } from './../../../../../../../libs/ui-components/src/lib/button/button.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { WorkspacePreviewComponent } from './workspace-preview/workspace-preview.component';
import { LogoPreviewModule, MenuModule, PreviewCardListModule, ToolbarModule } from '@ui-components';
import { WorkspacePreviewToolbarComponent } from './workspace-preview-toolbar/workspace-preview-toolbar.component';
import { NewBoardMenuModule } from "../../new-board-menu/new-board-menu.module";

@NgModule({
  declarations: [
    BoardsComponent,
    WorkspacePreviewComponent,
    WorkspacePreviewToolbarComponent,
  ],
  imports: [
    BoardsRoutingModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    PreviewCardListModule,
    LogoPreviewModule,
    ToolbarModule,
    MenuModule,
    NewBoardMenuModule,
  ],
})
export class BoardsModule {}
