import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UiInputComponent } from './ui-input.component';

@NgModule({
  declarations: [
    UiInputComponent
  ],
  imports: [
    CommonModule,
    InputTextareaModule,
  ],
  exports: [UiInputComponent]
})
export class UiInputModule { }
