import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarModule } from '../sidebar/sidebar.module';
import { TopnavModule } from '../topnav/topnav.module';
import { LayoutComponent } from './layout.component';
import {ContentModule} from "../content/content.module";

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    TopnavModule,
    ContentModule
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
