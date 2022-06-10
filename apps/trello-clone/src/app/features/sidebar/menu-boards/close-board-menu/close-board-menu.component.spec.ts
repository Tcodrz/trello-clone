import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseBoardMenuComponent } from './close-board-menu.component';
import {DarkMode} from "@trello-clone/trello-interface";
import {MockComponent} from "ng-mocks";
import {ButtonComponent, MenuComponent} from "@ui-components";

describe('CloseBoardMenuComponent', () => {
  let component: CloseBoardMenuComponent;
  let fixture: ComponentFixture<CloseBoardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CloseBoardMenuComponent,
        MockComponent(ButtonComponent),
        MockComponent(MenuComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseBoardMenuComponent);
    component = fixture.componentInstance;
    component.board = {
      createdAt: 0,
      id: "123",
      listIDs: [],
      members: [],
      name: "mock board",
      theme: DarkMode,
      updatedAt: 0,
      workspaceID: "1234"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
