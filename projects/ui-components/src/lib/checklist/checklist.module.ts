import { ClickOutsideModule } from './../click-outside/click-outside.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { MenuModule } from '../menu/menu.module';
import { ButtonModule } from './../button/button.module';
import { ProgressModule } from './../progress/progress.module';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { ChecklistComponent } from './checklist.component';



@NgModule({
  declarations: [
    ChecklistComponent,
    ChecklistItemComponent,
  ],
  imports: [
    ButtonModule,
    ButtonModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
    MenuModule,
    ProgressModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  exports: [ChecklistComponent]
})
export class ChecklistModule { }
