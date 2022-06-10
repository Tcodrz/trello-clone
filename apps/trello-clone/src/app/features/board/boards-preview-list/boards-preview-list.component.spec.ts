import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsPreviewListComponent } from './boards-preview-list.component';
import {GotoService} from "../../../core/services/goto.service";
import {createGotoServiceMock} from "../../../mocks/goto.service.mock";

describe('BoardsPreviewListComponent', () => {
  let component: BoardsPreviewListComponent;
  let fixture: ComponentFixture<BoardsPreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsPreviewListComponent ],
      providers: [
        {provide: GotoService, useValue: createGotoServiceMock()}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
