import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarModule } from '../sidebar/sidebar.module';
import { TopnavModule } from '../topnav/topnav.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    TopnavModule,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
