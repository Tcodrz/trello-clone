import { MenuModule } from './../../ui-components/menu/menu.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from './../../ui-components/button/button.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,

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
