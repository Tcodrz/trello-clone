import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, UICardModule } from '@ui-components';
import { LayoutModule } from '../layout/layout.module';
import { LoggedInGuard } from './../../core/guards/logged-in.guard';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent, canActivate: [LoggedInGuard] }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    ButtonModule,
    UICardModule,
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RegisterModule { }
