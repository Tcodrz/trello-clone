import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {UserService} from "../../core/services/user.service";
import {FormBuilder} from "@angular/forms";
import {ButtonModule} from "@ui-components";

type UserServiceMock = Partial<Record<keyof UserService, jest.Mock<UserService>>>;

function createUserServiceMock(): UserServiceMock {
  return {
    signInWithGoogle: jest.fn()
  };
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: UserService;
  let showMessageSpy: jest.SpyInstance;
  const ERROR_MESSAGE = 'Looks like one or more details is incorrect.';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: UserService, useValue: createUserServiceMock()},
        FormBuilder
      ],
      imports: [ButtonModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userServiceMock = TestBed.inject(UserService);
    showMessageSpy = jest.spyOn(component, 'showMessage');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('Should initialize loginForm', () => {
      expect(component.loginForm).toBeTruthy();
      expect(component.loginForm.value).toEqual({
        email: '',
        password: ''
      });
    });
  });

  describe('onSubmit', () => {
    it('Should call showMessage() with error message if form is not valid', () => {
      component.onSubmit();
      expect(showMessageSpy).toHaveBeenCalledWith(ERROR_MESSAGE);
    });

    it('Should do something if form is valid', () => {
      component.loginForm.patchValue({
        email: 'mock',
        password: 'mock'
      });
      component.onSubmit();
      expect(showMessageSpy).not.toHaveBeenCalled();
    });
  });

  describe('showMessage', () => {
    beforeEach(() => {
      component.showMessage('mock message');
    });

    it('Should push message to messages array', () => {
      expect(component.messages.length).toEqual(2);
      expect(component.messages[1]).toEqual('mock message');
    });

    it('Should reset the messages array after 2 seconds', waitForAsync(() => {
      setTimeout(() => {
        expect(component.messages.length).toEqual(1);
      }, 2100);
    }));
  });

  describe('onLoginWithGoogle', () => {
    beforeEach(() => {
      component.onLogInWithGoogle();
    });

    it('should call userService.signInWithGoogle', () => {
      expect(userServiceMock.signInWithGoogle).toHaveBeenCalled();
    });
  });
});
