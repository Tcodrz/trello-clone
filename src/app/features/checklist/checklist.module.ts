import { ProgressModule } from './../../../../projects/ui-components/src/lib/progress/progress.module';
import { ButtonModule } from './../../../../projects/ui-components/src/lib/button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from './checklist.component';


@NgModule({
  declarations: [
    ChecklistComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ProgressModule,
  ],
  exports: [ChecklistComponent]
})
export class ChecklistModule { }
