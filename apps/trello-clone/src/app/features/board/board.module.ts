import { MenuModule } from './../../../../../../libs/ui-components/src/lib/menu/menu.module';
import { UICardModule } from './../../../../../../libs/ui-components/src/lib/card/card.module';
import { ButtonModule } from './../../../../../../libs/ui-components/src/lib/button/button.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    UICardModule,
    CommonModule,
    DragDropModule,
    LayoutModule,
    ListModule,
    MenuModule,
  ]
})
export class BoardModule { }
