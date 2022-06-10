import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsPreviewListComponent } from './boards-preview-list.component';
import {GotoService} from "../../../core/services/goto.service";
import {createGotoServiceMock} from "../../../mocks/goto.service.mock";
import {MenuComponent, PreviewCardListComponent} from "@ui-components";
import {NewBoardMenuComponent} from "../../new-board-menu/new-board-menu.component";
import {MockComponent} from "ng-mocks";


describe('BoardsPreviewListComponent', () => {
  let component: BoardsPreviewListComponent;
  let fixture: ComponentFixture<BoardsPreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardsPreviewListComponent,
        MockComponent(MenuComponent),
        MockComponent(PreviewCardListComponent),
        MockComponent(NewBoardMenuComponent)
      ],
      providers: [
        {provide: GotoService, useValue: createGotoServiceMock()}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsPreviewListComponent);
    component = fixture.componentInstance;
    component.boards = [];
    component.workspace = null;
    component.workspaces = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
