import {ButtonModule, MenuModule} from '@ui-components';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileMenuComponent} from './profile-menu/profile-menu.component';
import {TopnavComponent} from './topnav.component';

@NgModule({
  declarations: [
    ProfileMenuComponent,
    TopnavComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    MenuModule,
    RouterModule,
  ],
  exports: [
    TopnavComponent,
  ]
})
export class TopnavModule {
}
