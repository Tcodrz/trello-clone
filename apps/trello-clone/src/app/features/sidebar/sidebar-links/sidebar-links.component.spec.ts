import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLinksComponent } from './sidebar-links.component';

describe('MenuDashboardComponent', () => {
  let component: SidebarLinksComponent;
  let fixture: ComponentFixture<SidebarLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarLinksComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
