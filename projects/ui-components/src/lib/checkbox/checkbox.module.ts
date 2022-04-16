import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckboxComponent } from './checkbox.component';


@NgModule({
  declarations: [
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [CheckboxComponent]
})
export class CheckboxModule { }
