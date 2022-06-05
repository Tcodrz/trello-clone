import { ButtonModule } from './../../../../../../../libs/ui-components/src/lib/button/button.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { WorkspacePreviewComponent } from './workspace-preview/workspace-preview.component';
import { LogoPreviewModule, PreviewCardListModule, ToolbarModule } from '@ui-components';
import { WorkspacePreviewToolbarComponent } from './workspace-preview-toolbar/workspace-preview-toolbar.component';

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
  ],
})
export class BoardsModule {}
