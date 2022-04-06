import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule } from '@ui-components';
import { ListCardPreviewModule } from './list-card-preview/list-card-preview.module';
import { ListComponent } from './list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    DragDropModule,
    ListCardPreviewModule,
    ReactiveFormsModule,
  ],
  exports: [
    ListComponent,
  ]
})
export class ListModule { }
