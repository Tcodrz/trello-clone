import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';


@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SelectComponent,
  ]
})
export class SelectModule { }
