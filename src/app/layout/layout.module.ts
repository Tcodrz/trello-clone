import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { IconComponent } from './icon/icon.component';
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SidebarDropdownComponent } from './sidebar-dropdown/sidebar-dropdown.component';



@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    IconComponent,
    LayoutComponent,
    MenuComponent,
    NavMenuComponent,
    SidebarComponent,
    TopnavComponent,
    SidebarDropdownComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    IconComponent,
    LayoutComponent,
    MenuComponent,
  ]
})
export class LayoutModule { }
