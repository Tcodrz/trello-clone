import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UICardModule, MenuModule } from '@ui-components';
import { NewBoardMenuModule } from '../../new-board-menu/new-board-menu.module';
import { BoardsPreviewListComponent } from './boards-preview-list.component';



@NgModule({
  declarations: [
    BoardsPreviewListComponent
  ],
  imports: [
    UICardModule,
    CommonModule,
    MenuModule,
    NewBoardMenuModule,
  ],
  exports: [
    BoardsPreviewListComponent,
  ]
})
export class BoardsPreviewListModule { }
