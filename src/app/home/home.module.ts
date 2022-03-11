import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './../login/login.module';
import { RegisterModule } from './../register/register.module';
import { HomeComponent } from './home.component';

const routes: Routes = []

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
