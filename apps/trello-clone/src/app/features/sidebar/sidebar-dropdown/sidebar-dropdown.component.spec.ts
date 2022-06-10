import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDropdownComponent } from './sidebar-dropdown.component';
import {MockComponent} from "ng-mocks";
import {IconComponent, LogoPreviewComponent} from "@ui-components";

describe('SidebarDropdownComponent', () => {
  let component: SidebarDropdownComponent;
  let fixture: ComponentFixture<SidebarDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarDropdownComponent,
        MockComponent(LogoPreviewComponent),
        MockComponent(IconComponent),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDropdownComponent);
    component = fixture.componentInstance;
    component.title = 'mock';
    component.items = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
