import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoPreviewComponent } from './logo-preview.component';

@NgModule({
  declarations: [LogoPreviewComponent],
  imports: [CommonModule],
  exports: [
    LogoPreviewComponent
  ]
})
export class LogoPreviewModule {}
