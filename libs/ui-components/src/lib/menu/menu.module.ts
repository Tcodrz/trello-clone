import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from '../button/button.module';
import { UICardModule } from '../card/card.module';
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
