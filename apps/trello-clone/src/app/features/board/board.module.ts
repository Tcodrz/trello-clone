// import { UICardModule, MenuModule, ButtonModule } from '@ui-components';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LayoutModule} from '../layout/layout.module';
import {ListModule} from '../list/list.module';
import {BoardListsComponent} from './board-lists/board-lists.component';
import {BoardRoutingModule} from './board-routing.module';
import {BoardComponent} from './board.component';
import {ButtonModule, MenuModule, UICardModule} from "@ui-components";


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
