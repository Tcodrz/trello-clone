import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonComponent, MenuComponent, NavMenuComponent} from '@ui-components';
import {MockComponent} from "ng-mocks";

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavMenuComponent,
        MockComponent(MenuComponent),
        MockComponent(ButtonComponent),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
