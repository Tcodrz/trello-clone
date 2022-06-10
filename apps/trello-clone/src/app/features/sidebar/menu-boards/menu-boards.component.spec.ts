import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBoardsComponent } from './menu-boards.component';
import {GotoService} from "../../../core/services/goto.service";
import {createGotoServiceMock} from "../../../mocks/goto.service.mock";

describe('MenuBoardsComponent', () => {
  let component: MenuBoardsComponent;
  let fixture: ComponentFixture<MenuBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBoardsComponent ],
      providers: [
        {provide: GotoService, useValue: createGotoServiceMock()}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
