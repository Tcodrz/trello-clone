import { UICardModule } from '@ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardPreviewComponent } from './list-card-preview.component';



@NgModule({
  declarations: [
    ListCardPreviewComponent
  ],
  imports: [
    CommonModule,
    UICardModule,
  ],
  exports: [
    ListCardPreviewComponent,
  ]
})
export class ListCardPreviewModule { }
