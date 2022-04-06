import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule, CardModule } from '@ui-components';
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
