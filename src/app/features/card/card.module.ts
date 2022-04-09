import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardSideMenuComponent } from './card-side-menu/card-side-menu.component';
import { ButtonModule, MenuModule } from '@ui-components';
import { MembersMenuComponent } from './card-side-menu/members-menu/members-menu.component';
import { LabelsMenuComponent } from './card-side-menu/labels-menu/labels-menu.component';
import { ChecklistMenuComponent } from './card-side-menu/checklist-menu/checklist-menu.component';
import { DatesMenuComponent } from './card-side-menu/dates-menu/dates-menu.component';
import { AttachementsMenuComponent } from './card-side-menu/attachements-menu/attachements-menu.component';



@NgModule({
  declarations: [
    CardComponent,
    CardSideMenuComponent,
    MembersMenuComponent,
    LabelsMenuComponent,
    ChecklistMenuComponent,
    DatesMenuComponent,
    AttachementsMenuComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
  ]
})
export class CardModule { }
