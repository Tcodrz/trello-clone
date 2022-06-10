import {ButtonModule, MenuModule} from '@ui-components';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileMenuComponent} from './profile-menu/profile-menu.component';
import {TopnavComponent} from './topnav.component';
import {LogoComponent} from './logo/logo.component';

@NgModule({
  declarations: [
    ProfileMenuComponent,
    TopnavComponent,
    LogoComponent
  ],
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
    RouterModule
  ],
  exports: [
    TopnavComponent,
    LogoComponent
  ],
})
export class TopnavModule {
}
