import { MenuModule } from './../../../../../../libs/ui-components/src/lib/menu/menu.module';
import { ButtonModule } from './../../../../../../libs/ui-components/src/lib/button/button.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBoardsComponent } from './menu-boards/menu-boards.component';
import { MenuWorkspacesComponent } from './menu-workspaces/menu-workspaces.component';
import { SidebarDropdownComponent } from './sidebar-dropdown/sidebar-dropdown.component';
import { SidebarLinksComponent } from './sidebar-links/sidebar-links.component';
import { SidebarComponent } from './sidebar.component';
import { CloseBoardMenuComponent } from './menu-boards/close-board-menu/close-board-menu.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LogoPreviewModule } from "@ui-components";

@NgModule({
  declarations: [
    CloseBoardMenuComponent,
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
		OverlayPanelModule,
		RouterModule,
		LogoPreviewModule,
	],
  exports: [
    SidebarComponent,
  ]
})
export class SidebarModule { }
