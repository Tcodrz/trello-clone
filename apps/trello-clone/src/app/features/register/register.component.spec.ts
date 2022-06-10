import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {createUserServiceMock} from "@trello-clone/trello-mocks";
import {MockComponent} from "ng-mocks";
import {ButtonComponent, CardComponent} from "@ui-components";
import {RouterTestingModule} from "@angular/router/testing";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        MockComponent(CardComponent),
        MockComponent(ButtonComponent),
      ],
      providers: [
        FormBuilder,
        {provide: UserService, useValue: createUserServiceMock()}
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
