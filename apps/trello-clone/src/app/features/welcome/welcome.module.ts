import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ui-components';
import { LayoutModule } from '../layout/layout.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent }
]

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    WelcomeRoutingModule,
    LayoutModule,
    RouterModule.forChild(routes),
  ]
})
export class WelcomeModule { }
