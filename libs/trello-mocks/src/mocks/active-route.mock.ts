import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

export type MockParams = Record<string, string>;

export function createActiveRouteMock(object: MockParams): Partial<ActivatedRoute> {
  return {
    params: of(object)
  }
}
