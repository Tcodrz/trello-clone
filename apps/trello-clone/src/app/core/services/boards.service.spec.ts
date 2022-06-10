import { TestBed } from '@angular/core/testing';

import { BoardsService } from './boards.service';
import {GotoService} from "./goto.service";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {createFirestoreMock} from "../../mocks/angular-firestore.mock";
import {CacheService} from "./cache.service";
import {createCacheServiceMock} from "../../mocks/cache.service.mock";
import {BoardsStore} from "../../state/boards/boards.store";
import {createBoardStoreMock} from "../../mocks/board-store.mock";
import {BoardsQuery} from "../../state/boards/board.query";
import {createBoardQueryMock} from "../../mocks/board-query.mock";

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: GotoService, useValue: createGotoServiceMock()},
        {provide: AngularFirestore, useValue: createFirestoreMock({}, [])},
        {provide: CacheService, useValue: createCacheServiceMock()},
        {provide: BoardsStore, useValue: createBoardStoreMock({
            boards: [],
            currentBoard: null
          })},
        {provide: BoardsQuery, useValue: createBoardQueryMock()}
      ]
    });
    service = TestBed.inject(BoardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
