import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../card/card.module';
import { ButtonModule } from './../button/button.module';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SidebarDropdownComponent } from './sidebar-dropdown/sidebar-dropdown.component';
import { SidebarLinksComponent } from './sidebar-links/sidebar-links.component';
import { MenuWorkspacesComponent } from './menu-workspaces/menu-workspaces.component';
import { MenuBoardsComponent } from './menu-boards/menu-boards.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavMenuComponent,
    SidebarDropdownComponent,
    SidebarLinksComponent,
    MenuWorkspacesComponent,
    MenuBoardsComponent,
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
    SidebarDropdownComponent,
    SidebarLinksComponent,
    MenuWorkspacesComponent,
    MenuBoardsComponent,
  ]
})
export class MenuModule { }
