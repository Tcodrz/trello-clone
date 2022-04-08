import { ButtonListModule } from './../../../../projects/ui-components/src/lib/button-list/button-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardSideMenuComponent } from './card-side-menu/card-side-menu.component';
import { ButtonModule, MenuModule } from '@ui-components';
import { MembersMenuComponent } from './card-side-menu/members-menu/members-menu.component';



@NgModule({
  declarations: [
    CardComponent,
    CardSideMenuComponent,
    MembersMenuComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
  ]
})
export class CardModule { }
