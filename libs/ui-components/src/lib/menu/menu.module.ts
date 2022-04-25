import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule, UICardModule } from '@ui-components';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuComponent } from './menu/menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
@NgModule({
  declarations: [
    MenuComponent,
    NavMenuComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    OverlayPanelModule,
    RouterModule,
    UICardModule,
  ],
  exports: [
    MenuComponent,
    NavMenuComponent,
  ]
})
export class MenuModule { }
