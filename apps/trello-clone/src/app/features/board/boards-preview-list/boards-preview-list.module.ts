import { MenuModule } from './../../../../../../../libs/ui-components/src/lib/menu/menu.module';
import { UICardModule } from './../../../../../../../libs/ui-components/src/lib/card/card.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
