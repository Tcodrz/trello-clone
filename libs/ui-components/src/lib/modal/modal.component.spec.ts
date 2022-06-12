/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalComponent, ModalService} from '@ui-components';
import {DialogService} from "primeng/dynamicdialog";
import {of} from "rxjs";

type DialogServiceMock = Partial<Record<keyof DialogService, jest.Mock>>;


function createDialogServiceMock(): DialogServiceMock {
  return {
    open: jest.fn()
  }
}

type ModalServiceMock = Partial<Record<keyof ModalService, jest.Mock>>;

function createModalServiceMock(): ModalServiceMock {
  return {
    config: jest.fn(() => of(true))
  };
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        {provide: DialogService, useValue: createDialogServiceMock()},
        {provide: ModalService, useValue: createModalServiceMock()},
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
