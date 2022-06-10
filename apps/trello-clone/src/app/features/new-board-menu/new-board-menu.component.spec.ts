import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardMenuComponent } from './new-board-menu.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MockComponent} from "ng-mocks";
import {ButtonComponent, SelectComponent} from "@ui-components";

describe('NewBoardMenuComponent', () => {
  let component: NewBoardMenuComponent;
  let fixture: ComponentFixture<NewBoardMenuComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewBoardMenuComponent,
        MockComponent(SelectComponent),
        MockComponent(ButtonComponent)
      ],
      imports: [ReactiveFormsModule],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardMenuComponent);
    component = fixture.componentInstance;
    component.workspaces = [];
    component.currentWorkspace = null;
    formBuilder = TestBed.inject(FormBuilder);
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
