import { TestBed } from '@angular/core/testing';

import { WorkspaceService } from './workspace.service';
import {CacheService} from "./cache.service";
import {createCacheServiceMock} from "../../mocks/cache.service.mock";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";
import {GotoService} from "./goto.service";



describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CacheService, useValue: createCacheServiceMock()},
        {provide: GotoService, useValue: createGotoServiceMock()},

      ]
    });
    service = TestBed.inject(WorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
