import {TestBed} from '@angular/core/testing';
import {SidebarService} from './sidebar.service';
import {WorkspacesQuery} from "../../state/workspaces/workspace.query";
import {WorkspaceStore} from "../../state/workspaces/workspaces.store";
import {createWorkspaceQueryMock} from "../../mocks/workspace-query.mock";
import {createWorkspaceStoreMock} from "../../mocks/workspace-store.mock";

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: WorkspacesQuery, useValue: createWorkspaceQueryMock()},
        {
          provide: WorkspaceStore, useValue: createWorkspaceStoreMock({
            currentWorkspace: null,
            workspaces: []
          })
        },
      ]
    });
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
