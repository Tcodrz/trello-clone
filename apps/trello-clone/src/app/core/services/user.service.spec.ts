import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {createAngularFireAuthMock} from "../../mocks/angular-fireauth.mock";
import {CacheService} from "./cache.service";
import {createCacheServiceMock} from "../../mocks/cache.service.mock";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {createFirestoreMock} from "../../mocks/angular-firestore.mock";
import {GotoService} from "./goto.service";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";
import {createUserStoreMock} from "../../mocks/user-store.mock";
import {UserStore} from "../../state/user/user.store";
import {UserQuery} from "../../state/user/user.query";
import {createUserQueryMock} from "../../mocks/user-query.mock";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireAuth, useValue: createAngularFireAuthMock()},
        {provide: CacheService, useValue: createCacheServiceMock()},
        {provide: AngularFirestore, useValue: createFirestoreMock({}, [])},
        {provide: GotoService, useValue: createGotoServiceMock()},
        {provide: UserStore, useValue: createUserStoreMock({
            user: null
          })},
        {provide: UserQuery, useValue: createUserQueryMock()}
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
