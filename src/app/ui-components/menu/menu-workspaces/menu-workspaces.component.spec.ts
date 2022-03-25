import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWorkspacesComponent } from './menu-workspaces.component';

describe('MenuWorkspacesComponent', () => {
  let component: MenuWorkspacesComponent;
  let fixture: ComponentFixture<MenuWorkspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWorkspacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
