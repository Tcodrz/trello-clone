import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from '@ui-components';
import { ButtonModule } from './../../../../projects/ui-components/src/lib/button/button.module';
import { ProgressModule } from './../../../../projects/ui-components/src/lib/progress/progress.module';
import { ChecklistComponent } from './checklist.component';


@NgModule({
  declarations: [
    ChecklistComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    ProgressModule,
  ],
  exports: [ChecklistComponent]
})
export class ChecklistModule { }
