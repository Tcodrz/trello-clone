import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '../layout/layout.module';
import { BoardsComponent } from './boards/boards.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { TemplatesComponent } from './templates/templates.component';

@NgModule({
  declarations: [
    BoardsComponent,
    DashboardComponent,
    HomeComponent,
    TemplatesComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
  ]
})
export class DashboardModule { }
