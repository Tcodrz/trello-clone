import { TestBed } from '@angular/core/testing';

import { WorkspaceService } from './workspace.service';
import {CacheService} from "./cache.service";
import {createCacheServiceMock} from "../../mocks/cache.service.mock";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";
import {GotoService} from "./goto.service";
import {WorkspacesQuery} from "../../state/workspaces/workspace.query";
import {createWorkspaceQueryMock} from "../../mocks/workspace-query.mock";
import {WorkspaceStore} from "../../state/workspaces/workspaces.store";
import {createWorkspaceStoreMock} from "../../mocks/workspace-store.mock";



describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CacheService, useValue: createCacheServiceMock()},
        {provide: GotoService, useValue: createGotoServiceMock()},
        {provide: WorkspacesQuery, useValue: createWorkspaceQueryMock()},
        {
          provide: WorkspaceStore,
          useValue: createWorkspaceStoreMock({
            currentWorkspace: null, workspaces: []})
        }
      ]
    });
    service = TestBed.inject(WorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
