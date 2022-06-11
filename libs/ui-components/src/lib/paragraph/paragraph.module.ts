import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParagraphComponent} from './paragraph.component';
import {ButtonModule} from "../button/button.module";
import {UiChipModule} from "../ui-chip/ui-chip.module";

@NgModule({
  declarations: [ParagraphComponent],
  imports: [
    CommonModule,
    ButtonModule,
    UiChipModule
  ],
  exports: [ParagraphComponent]
})
export class ParagraphModule {
}
