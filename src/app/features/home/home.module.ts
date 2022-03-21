import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { ButtonModule } from './../../ui-components/button/button.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
