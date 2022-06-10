import {TestBed} from '@angular/core/testing';

import {CardService} from './card.service';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Card} from "@trello-clone/trello-interface";
import {of} from "rxjs";
import {createFirestoreMock} from "../../mocks/angular-firestore.mock";
import {ListsState, ListsStore} from "../../state/lists/lists.store";
import {BoardsStore, BoardState} from "../../state/boards/boards.store";
import {createBoardStoreMock} from "../../mocks/board-store.mock";
import {createListStoreMock} from "../../mocks/list-store.mock";

const cardMock: Card = {
  archived: false,
  checklists: [],
  createdAt: 0,
  id: "",
  listID: "",
  name: "",
  position: 0
}

const cardsMock: Card[] = [
  {
    archived: false,
    checklists: [],
    createdAt: 0,
    id: "1",
    listID: "123",
    name: "mock card 1",
    position: 0
  },{
    archived: false,
    checklists: [],
    createdAt: 0,
    id: "2",
    listID: "123",
    name: "mock card 2",
    position: 0
  },{
    archived: false,
    checklists: [],
    createdAt: 0,
    id: "3",
    listID: "123",
    name: "mock card 3",
    position: 0
  },
];

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: createFirestoreMock(cardMock, cardsMock)},
        {provide: ListsStore, useValue: createListStoreMock({
            lists: []
          })},
        {provide: BoardsStore, useValue: createBoardStoreMock({
            boards: [],
            currentBoard: null
          })}
      ]
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
