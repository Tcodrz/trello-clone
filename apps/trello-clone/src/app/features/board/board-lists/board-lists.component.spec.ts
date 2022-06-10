import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListsComponent } from './board-lists.component';
import {BoardsService} from "../../../core/services/boards.service";
import {createBoardsServiceMock} from "../../../mocks/board.service.mock";
import {ListsStore} from "../../../state/lists/lists.store";
import {createListStoreMock} from "../../../mocks/list-store.mock";

describe('BoardListsComponent', () => {
  let component: BoardListsComponent;
  let fixture: ComponentFixture<BoardListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardListsComponent ],
      providers: [
        {provide: BoardsService, useValue: createBoardsServiceMock()},
        {
          provide: ListsStore,
          useValue: createListStoreMock({
            lists: []
          })
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
