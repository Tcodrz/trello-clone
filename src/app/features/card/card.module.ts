import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule, ChecklistModule, MenuModule } from '@ui-components';
import { AttachementsMenuComponent } from './card-side-menu/attachements-menu/attachements-menu.component';
import { CardSideMenuComponent } from './card-side-menu/card-side-menu.component';
import { ChecklistMenuComponent } from './card-side-menu/checklist-menu/checklist-menu.component';
import { DatesMenuComponent } from './card-side-menu/dates-menu/dates-menu.component';
import { LabelsMenuComponent } from './card-side-menu/labels-menu/labels-menu.component';
import { MembersMenuComponent } from './card-side-menu/members-menu/members-menu.component';
import { CardComponent } from './card.component';



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
    ButtonModule,
    ChecklistModule,
    CommonModule,
    MenuModule,
    DragDropModule,
  ]
})
export class CardModule { }
