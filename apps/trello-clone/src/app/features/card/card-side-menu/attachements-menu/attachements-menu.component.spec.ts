import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachementsMenuComponent } from './attachements-menu.component';
import {MockComponent} from "ng-mocks";
import {ButtonComponent, MenuComponent} from "@ui-components";

describe('AttachementsMenuComponent', () => {
  let component: AttachementsMenuComponent;
  let fixture: ComponentFixture<AttachementsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AttachementsMenuComponent,
        MockComponent(ButtonComponent),
        MockComponent(MenuComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachementsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
