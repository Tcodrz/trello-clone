import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseBoardMenuComponent } from './close-board-menu.component';

describe('CloseBoardMenuComponent', () => {
  let component: CloseBoardMenuComponent;
  let fixture: ComponentFixture<CloseBoardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseBoardMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseBoardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
