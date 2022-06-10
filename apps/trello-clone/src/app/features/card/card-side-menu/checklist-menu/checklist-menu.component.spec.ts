import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChecklistMenuComponent} from './checklist-menu.component';
import {MockComponent} from "ng-mocks";
import {ButtonComponent, MenuComponent} from "@ui-components";

describe('ChecklistMenuComponent', () => {
  let component: ChecklistMenuComponent;
  let fixture: ComponentFixture<ChecklistMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChecklistMenuComponent,
        MockComponent(ButtonComponent),
        MockComponent(MenuComponent)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
