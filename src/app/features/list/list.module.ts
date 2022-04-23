import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, UICardModule, UiInputModule } from '@ui-components';
import { CardModule } from '../card/card.module';
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
    UICardModule,
    UiInputModule,
  ],
  exports: [
    ListComponent,
  ]
})
export class ListModule { }
