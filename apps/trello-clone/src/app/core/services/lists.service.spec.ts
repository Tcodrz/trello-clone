import {TestBed} from '@angular/core/testing';
import {ListsService} from './lists.service';
import {CardService} from "./card.service";
import {createCardServiceMock} from "../../mocks/card-service.mock";

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CardService, useValue: createCardServiceMock()}
      ]
    });
    service = TestBed.inject(ListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
