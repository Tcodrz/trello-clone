import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsPreviewListComponent } from './boards-preview-list.component';

describe('BoardsPreviewListComponent', () => {
  let component: BoardsPreviewListComponent;
  let fixture: ComponentFixture<BoardsPreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsPreviewListComponent ]
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
