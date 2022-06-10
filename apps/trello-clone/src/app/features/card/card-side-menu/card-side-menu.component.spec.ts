import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSideMenuComponent } from './card-side-menu.component';
import {DarkMode} from "@trello-clone/trello-interface";
import {MockComponent} from "ng-mocks";
import {MembersMenuComponent} from "./members-menu/members-menu.component";
import {LabelsMenuComponent} from "./labels-menu/labels-menu.component";
import {ChecklistMenuComponent} from "./checklist-menu/checklist-menu.component";
import {DatesMenuComponent} from "./dates-menu/dates-menu.component";
import {AttachementsMenuComponent} from "./attachements-menu/attachements-menu.component";
import {ButtonComponent} from "@ui-components";

describe('CardAddMenuComponent', () => {
  let component: CardSideMenuComponent;
  let fixture: ComponentFixture<CardSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardSideMenuComponent,
        MockComponent(MembersMenuComponent),
        MockComponent(LabelsMenuComponent),
        MockComponent(ChecklistMenuComponent),
        MockComponent(DatesMenuComponent),
        MockComponent(AttachementsMenuComponent),
        MockComponent(ButtonComponent),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSideMenuComponent);
    component = fixture.componentInstance;
    component.board = {
      createdAt: 0,
      id: "1234",
      listIDs: [],
      lists: [],
      members: [],
      name: "",
      theme: DarkMode,
      updatedAt: 0,
      workspaceID: "1234"
    };
    component.card = {
      archived: false,
      checklists: [],
      cover: "",
      createdAt: 0,
      description: "mock card",
      id: "1323",
      listID: "1234",
      name: "mock card",
      position: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
