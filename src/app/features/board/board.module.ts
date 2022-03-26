import { ButtonModule } from './../../ui-components/button/button.module';
import { CardModule } from './../../ui-components/card/card.module';
import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';


@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    BoardRoutingModule,
    ButtonModule,
    CardModule,
    CommonModule,
    LayoutModule,
  ]
})
export class BoardModule { }
