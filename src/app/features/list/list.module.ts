import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from './../../ui-components/button/button.module';
import { CardModule } from './../../ui-components/card/card.module';
import { ListCardPreviewModule } from './../../ui-components/list-card-preview/list-card-preview.module';
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
