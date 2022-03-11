import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
