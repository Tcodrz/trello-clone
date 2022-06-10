import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacePreviewComponent } from './workspace-preview.component';
import {BoardsService} from "../../../../core/services/boards.service";
import {createBoardsServiceMock} from "../../../../mocks/board.service.mock";
import {WorkspaceService} from "../../../../core/services/workspace.service";
import {createWorkspaceServiceMock} from "../../../../mocks/workspace.service.mock";
import {GotoService} from "../../../../core/services/goto.service";
import {createGotoServiceMock} from "../../../../mocks/goto.service.mock";

describe('WorkspacePreviewComponent', () => {
  let component: WorkspacePreviewComponent;
  let fixture: ComponentFixture<WorkspacePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspacePreviewComponent],
      providers:[
        {provide: BoardsService, useValue: createBoardsServiceMock()},
        {provide: WorkspaceService, useValue: createWorkspaceServiceMock()},
        {provide: GotoService, useValue: createGotoServiceMock()}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacePreviewComponent);
    component = fixture.componentInstance;
    component.workspace = {
      id: "123", name: "mock workspace", userID: "1234"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
