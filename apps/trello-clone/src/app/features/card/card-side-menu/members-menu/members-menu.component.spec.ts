import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersMenuComponent } from './members-menu.component';
import {MockComponent} from "ng-mocks";
import {ButtonComponent, MenuComponent} from "@ui-components";

describe('MembersMenuComponent', () => {
  let component: MembersMenuComponent;
  let fixture: ComponentFixture<MembersMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MembersMenuComponent,
        MockComponent(MenuComponent),
        MockComponent(ButtonComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMenuComponent);
    component = fixture.componentInstance;
    component.members = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
