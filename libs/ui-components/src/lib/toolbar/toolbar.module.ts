import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ButtonModule } from "../button/button.module";

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
