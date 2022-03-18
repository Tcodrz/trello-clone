import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoardsComponent } from './boards/boards.component';
import { TemplatesComponent } from './templates/templates.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BoardsComponent,
    TemplatesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
  ]
})
export class DashboardModule { }
