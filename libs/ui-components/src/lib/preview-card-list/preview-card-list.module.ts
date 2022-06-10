import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewCardListComponent } from './preview-card-list.component';
import { PreviewCardModule } from "../preview-card/preview-card.module";

@NgModule({
  declarations: [PreviewCardListComponent],
  imports: [CommonModule, PreviewCardModule],
  exports: [PreviewCardListComponent]
})
export class PreviewCardListModule {}
