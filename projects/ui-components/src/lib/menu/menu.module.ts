import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ButtonModule, UICardModule } from '@ui-components';

@NgModule({
  declarations: [
    MenuComponent,
    NavMenuComponent,
  ],
  imports: [
    ButtonModule,
    UICardModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    MenuComponent,
    NavMenuComponent,
  ]
})
export class MenuModule { }
