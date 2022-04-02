import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './../../ui-components/button/button.module';
import { CardModule } from './../../ui-components/card/card.module';
import { LayoutModule } from './../layout/layout.module';
import { ListModule } from './../list/list.module';
import { BoardListsComponent } from './board-lists/board-lists.component';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';


@NgModule({
  declarations: [
    BoardComponent,
    BoardListsComponent
  ],
  imports: [
    BoardRoutingModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DragDropModule,
    LayoutModule,
    ListModule,
  ]
})
export class BoardModule { }
