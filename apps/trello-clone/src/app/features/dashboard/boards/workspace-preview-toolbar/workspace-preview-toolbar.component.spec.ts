import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacePreviewToolbarComponent } from './workspace-preview-toolbar.component';

describe('WorkspacePreviewToolbarComponent', () => {
  let component: WorkspacePreviewToolbarComponent;
  let fixture: ComponentFixture<WorkspacePreviewToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspacePreviewToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacePreviewToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
