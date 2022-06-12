import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ButtonComponent, MenuComponent} from '@ui-components';
import {MockComponent} from "ng-mocks";
import {OverlayPanel} from "primeng/overlaypanel";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        MockComponent(OverlayPanel),
        MockComponent(ButtonComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
