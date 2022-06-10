import {ButtonModule, SelectModule} from '@ui-components';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewBoardMenuComponent} from './new-board-menu.component';


@NgModule({
  declarations: [
    NewBoardMenuComponent
  ],
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  exports: [
    NewBoardMenuComponent,
  ]
})
export class NewBoardMenuModule { }
