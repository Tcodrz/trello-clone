import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewBoardMenuModule } from './../../features/new-board-menu/new-board-menu.module';
import { CardModule } from './../card/card.module';
import { MenuModule } from './../menu/menu.module';
import { BoardsPreviewListComponent } from './boards-preview-list.component';



@NgModule({
  declarations: [
    BoardsPreviewListComponent
  ],
  imports: [
    CardModule,
    CommonModule,
    MenuModule,
    NewBoardMenuModule,
  ],
  exports: [
    BoardsPreviewListComponent,
  ]
})
export class BoardsPreviewListModule { }
