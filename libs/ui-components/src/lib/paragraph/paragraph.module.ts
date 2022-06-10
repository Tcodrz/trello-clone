import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParagraphComponent } from './paragraph.component';
import {ButtonModule} from "../button/button.module";

@NgModule({
  declarations: [ParagraphComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ParagraphComponent]
})
export class ParagraphModule {}
