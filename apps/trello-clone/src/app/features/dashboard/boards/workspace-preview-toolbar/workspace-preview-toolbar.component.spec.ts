import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkspacePreviewToolbarComponent} from './workspace-preview-toolbar.component';
import {GotoService} from "../../../../core/services/goto.service";
import {createGotoServiceMock} from "../../../../mocks/goto.service.mock";
import {WorkspaceService} from "../../../../core/services/workspace.service";
import {createWorkspaceServiceMock} from "../../../../mocks/workspace.service.mock";
import {ToolbarComponent} from "@ui-components";
import {MockComponent} from "ng-mocks";

describe('WorkspacePreviewToolbarComponent', () => {
  let component: WorkspacePreviewToolbarComponent;
  let fixture: ComponentFixture<WorkspacePreviewToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WorkspacePreviewToolbarComponent,
        MockComponent(ToolbarComponent)
      ],
      providers: [
        {provide: GotoService, useValue: createGotoServiceMock()},
        {provide: WorkspaceService, useValue: createWorkspaceServiceMock()}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacePreviewToolbarComponent);
    component = fixture.componentInstance;
    component.workspace = {
      id: "123",
      name: "mock workspace",
      userID: "q1234"
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
