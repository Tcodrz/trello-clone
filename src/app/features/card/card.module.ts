import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardAddMenuComponent } from './card-add-menu/card-add-menu.component';



@NgModule({
  declarations: [
    CardComponent,
    CardAddMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardModule { }
