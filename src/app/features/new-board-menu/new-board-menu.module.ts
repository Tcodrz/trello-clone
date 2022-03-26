import { ButtonModule } from './../../ui-components/button/button.module';
import { SelectModule } from './../../ui-components/select/select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoardMenuComponent } from './new-board-menu.component';



@NgModule({
  declarations: [
    NewBoardMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    ButtonModule,
  ],
  exports: [
    NewBoardMenuComponent,
  ]
})
export class NewBoardMenuModule { }
