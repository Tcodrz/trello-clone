import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BoardComponent} from './board.component';
import {ActivatedRoute} from "@angular/router";
import {createActiveRouteMock} from "../../mocks/active-route.mock";
import {BoardsService} from "../../core/services/boards.service";
import {createBoardsServiceMock} from "../../mocks/board.service.mock";
import {BoardsStore} from "../../state/boards/boards.store";
import {createBoardStoreMock} from "../../mocks/board-store.mock";
import {GotoService} from "../../core/services/goto.service";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";
import {ModalService} from "@ui-components";
import {ListsQuery} from "../../state/lists/lists.query";
import {ListsStore} from "../../state/lists/lists.store";
import {createListStoreMock} from "../../mocks/list-store.mock";
import {CardService} from "../../core/services/card.service";
import {WorkspaceService} from "../../core/services/workspace.service";
import {createWorkspaceServiceMock} from "../../mocks/workspace.service.mock";
import {createModalServiceMock} from "../../mocks/modal-service.mock";
import {createListQueryMock} from "../../mocks/list-query.mock";
import {createCardServiceMock} from "../../mocks/card-service.mock";

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
    providers: [
      {provide: ActivatedRoute, useValue: createActiveRouteMock({})},
      {provide: BoardsService, useValue: createBoardsServiceMock()},
      {provide: GotoService, useValue: createGotoServiceMock()},
      {provide: ModalService, useValue: createModalServiceMock()},
      {provide: ListsQuery, useValue: createListQueryMock()},
      {provide: CardService, useValue: createCardServiceMock()},
      {provide: WorkspaceService, useValue: createWorkspaceServiceMock()},
      {provide: BoardsStore, useValue: createBoardStoreMock({
          boards: [],
          currentBoard: null
        })},
      {provide: ListsStore, useValue: createListStoreMock({
          lists: []
        })},
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
