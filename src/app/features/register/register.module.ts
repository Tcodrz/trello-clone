import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../../ui-components/card/card.module';
import { LayoutModule } from '../layout/layout.module';
import { LoggedInGuard } from './../../core/guards/logged-in.guard';
import { ButtonModule } from './../../ui-components/button/button.module';
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
    CardModule,
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RegisterModule { }
