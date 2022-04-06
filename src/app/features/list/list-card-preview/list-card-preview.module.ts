import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardPreviewComponent } from './list-card-preview.component';
import { CardModule } from '@ui-components';



@NgModule({
  declarations: [
    ListCardPreviewComponent
  ],
  imports: [
    CommonModule,
    CardModule,
  ],
  exports: [
    ListCardPreviewComponent,
  ]
})
export class ListCardPreviewModule { }
