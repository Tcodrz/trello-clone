import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../card/card.module';
import { ButtonModule } from './../button/button.module';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavMenuComponent,
  ],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    MenuComponent,
    NavMenuComponent,
  ]
})
export class MenuModule { }
