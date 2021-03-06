import {
    ButtonModule,
    LogoPreviewModule, ParagraphModule,
    TabsModule,
    UICardModule,
} from '@ui-components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsPreviewListModule } from '../board/boards-preview-list/boards-preview-list.module';
import { LayoutModule } from '../layout/layout.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceHeaderComponent } from './workspace-header/workspace-header.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceHeaderComponent,
    MembersComponent,
  ],
    imports: [
        BoardsPreviewListModule,
        UICardModule,
        CommonModule,
        LayoutModule,
        WorkspaceRoutingModule,
        TabsModule,
        ButtonModule,
        LogoPreviewModule,
        ParagraphModule,
    ],
})
export class WorkspaceModule {}
