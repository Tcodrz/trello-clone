import { UiInputModule } from './../../../../../../libs/ui-components/src/lib/ui-input/ui-input.module';
import { UICardModule } from './../../../../../../libs/ui-components/src/lib/card/card.module';
import { ButtonModule } from './../../../../../../libs/ui-components/src/lib/button/button.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
