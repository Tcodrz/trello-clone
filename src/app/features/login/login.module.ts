import { LoggedInGuard } from './../../core/guards/logged-in.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../../ui-components/card/card.module';
import { ButtonModule } from './../../ui-components/button/button.module';
import { LoginComponent } from './login.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoggedInGuard] }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
