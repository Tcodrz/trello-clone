import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacePreviewComponent } from './workspace-preview.component';

describe('WorkspacePreviewComponent', () => {
  let component: WorkspacePreviewComponent;
  let fixture: ComponentFixture<WorkspacePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspacePreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
