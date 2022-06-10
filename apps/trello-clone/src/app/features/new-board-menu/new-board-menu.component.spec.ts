import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardMenuComponent } from './new-board-menu.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('NewBoardMenuComponent', () => {
  let component: NewBoardMenuComponent;
  let fixture: ComponentFixture<NewBoardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBoardMenuComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
