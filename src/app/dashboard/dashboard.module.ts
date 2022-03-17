import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FeedComponent } from './feed/feed.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
  ]
})
export class DashboardModule { }
