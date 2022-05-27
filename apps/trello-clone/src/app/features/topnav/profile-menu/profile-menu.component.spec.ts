import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileMenuComponent} from './profile-menu.component';
import {User} from "../../../core/interface/user.interface";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

const MOCK_USER: User = {
  email: "mock@email.com",
  id: "1234",
  name: "mock user",
  picture: "http://mock-img.com/"
}

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMenuComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
    component.user = MOCK_USER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get the user from parent component', () => {
    expect(component.user).toBeTruthy();
    expect(component.user).toEqual(MOCK_USER);
  });

  it('Should render the user image', () => {
    const imageElement = fixture.debugElement.query(By.css('img'));
    expect(imageElement.nativeElement.src).toEqual(MOCK_USER.picture);
  });

  it('Should render the users name', () => {
    const usernameDivElement = fixture.debugElement.query(By.css('.username'));
    expect(usernameDivElement.nativeElement.innerHTML).toEqual(MOCK_USER.name);
  });

  it('Should render the users email', () => {
    const userEmailDivElement = fixture.debugElement.query(By.css('.email'));
    expect(userEmailDivElement.nativeElement.innerHTML).toEqual(MOCK_USER.email);
  })
});
