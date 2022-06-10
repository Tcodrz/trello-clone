import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsMenuComponent } from './labels-menu.component';
import {MockComponent} from "ng-mocks";
import {ButtonComponent, MenuComponent} from "@ui-components";

describe('LabelsMenuComponent', () => {
  let component: LabelsMenuComponent;
  let fixture: ComponentFixture<LabelsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LabelsMenuComponent,
        MockComponent(ButtonComponent),
        MockComponent(MenuComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
