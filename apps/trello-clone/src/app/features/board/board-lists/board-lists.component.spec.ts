import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListsComponent } from './board-lists.component';

describe('BoardListsComponent', () => {
  let component: BoardListsComponent;
  let fixture: ComponentFixture<BoardListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardListsComponent ]
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
