import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../card/card.module';
import { ButtonModule } from './../button/button.module';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SidebarDropdownComponent } from './sidebar-dropdown/sidebar-dropdown.component';



@NgModule({
  declarations: [
    MenuComponent,
    NavMenuComponent,
    SidebarDropdownComponent,
  ],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
  ],
  exports: [
    MenuComponent,
    NavMenuComponent,
    SidebarDropdownComponent,
  ]
})
export class MenuModule { }
