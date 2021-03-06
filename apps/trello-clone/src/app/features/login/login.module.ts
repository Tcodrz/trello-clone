import {ButtonModule, UICardModule} from '@ui-components';
import {LoggedInGuard} from '../../core/guards/logged-in.guard';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoggedInGuard] }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ButtonModule,
    UICardModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
