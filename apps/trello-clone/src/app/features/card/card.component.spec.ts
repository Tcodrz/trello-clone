import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import {BoardsService} from "../../core/services/boards.service";
import {createBoardsServiceMock} from "../../mocks/board.service.mock";
import {CardService} from "../../core/services/card.service";
import {createCardServiceMock} from "../../mocks/card-service.mock";
import {ModalService} from "@ui-components";
import {createModalServiceMock} from "../../mocks/modal-service.mock";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Location} from "@angular/common";


function createDialogRefMock(): Partial<Record<keyof DynamicDialogRef, jest.Mock>> {
  return {
    close: jest.fn()
  }
}

function createLocationMock() {
  return {
    path: jest.fn(() => 'x=1;y=2;z=3;v=4')
  }
}


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [
        {provide: BoardsService, useValue: createBoardsServiceMock()},
        {provide: CardService, useValue: createCardServiceMock()},
        {provide: ModalService, useValue: createModalServiceMock()},
        {provide: DynamicDialogRef, useValue: createDialogRefMock()},
        {provide: Location, useValue: createLocationMock()}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
