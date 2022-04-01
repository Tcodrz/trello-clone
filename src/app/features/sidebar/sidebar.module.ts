import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from './../../ui-components/button/button.module';
import { MenuBoardsComponent } from './../../ui-components/menu/menu-boards/menu-boards.component';
import { MenuWorkspacesComponent } from './../../ui-components/menu/menu-workspaces/menu-workspaces.component';
import { MenuModule } from './../../ui-components/menu/menu.module';
import { SidebarDropdownComponent } from './../../ui-components/menu/sidebar-dropdown/sidebar-dropdown.component';
import { SidebarLinksComponent } from './../../ui-components/menu/sidebar-links/sidebar-links.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    MenuBoardsComponent,
    MenuWorkspacesComponent,
    SidebarComponent,
    SidebarDropdownComponent,
    SidebarLinksComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
  ]
})
export class SidebarModule { }
