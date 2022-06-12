import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ButtonComponent, ChecklistComponent, MenuComponent} from '@ui-components';
import {MockComponent} from "ng-mocks";

describe('ChecklistComponent', () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChecklistComponent,
        MockComponent(ButtonComponent),
        MockComponent(MenuComponent),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
