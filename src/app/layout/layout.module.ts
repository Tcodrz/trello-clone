import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { IconComponent } from './icon/icon.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    CardComponent,
    IconComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    CardComponent,
    IconComponent,
    ButtonComponent,
  ]
})
export class LayoutModule { }
