import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWorkspacesComponent } from './menu-workspaces.component';
import {MockComponent} from "ng-mocks";
import {ButtonComponent} from "@ui-components";
import {SidebarDropdownComponent} from "../sidebar-dropdown/sidebar-dropdown.component";

describe('MenuWorkspacesComponent', () => {
  let component: MenuWorkspacesComponent;
  let fixture: ComponentFixture<MenuWorkspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuWorkspacesComponent,
        MockComponent(ButtonComponent),
        MockComponent(SidebarDropdownComponent)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWorkspacesComponent);
    component = fixture.componentInstance;
    component.workspaces = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
