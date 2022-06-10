import { TestBed } from '@angular/core/testing';

import { GotoService } from './goto.service';
import {RouterTestingModule} from "@angular/router/testing";

fdescribe('GotoService', () => {
  let service: GotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(GotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
