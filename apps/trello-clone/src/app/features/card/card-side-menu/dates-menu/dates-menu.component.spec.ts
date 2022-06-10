import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesMenuComponent } from './dates-menu.component';
import {MockComponent} from "ng-mocks";
import {ButtonComponent, MenuComponent} from "@ui-components";

describe('DatesMenuComponent', () => {
  let component: DatesMenuComponent;
  let fixture: ComponentFixture<DatesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DatesMenuComponent,
        MockComponent(ButtonComponent),
        MockComponent(MenuComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
