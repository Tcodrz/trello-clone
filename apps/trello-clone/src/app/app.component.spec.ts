import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {CacheKeys, CacheService} from "./core/services/cache.service";
import {UserService} from "./core/services/user.service";
import {WorkspaceStore} from "./state/workspaces/workspaces.store";
import {User} from "./core/interface/user.interface";
import {ModalModule} from "@ui-components";

const MOCK_USER: User = {
  email: "tom@email.com",
  id: "1",
  name: "Tom",
  picture: "http://google.pic/tom"
};

type CacheServiceMock = Partial<Record<keyof CacheService, jest.Mock<CacheService>>>;

function createCacheServiceMock(): CacheServiceMock {
  return {
    getItem: jest.fn().mockReturnValue(MOCK_USER)
  }
}

function createUserServiceMock(): Partial<UserService> {
  return {
    login: jest.fn()
  };
}

function createWorkspaceStoreMock(): Partial<WorkspaceStore> {
  return {
    init: jest.fn()
  };
}

describe('AppComponent', () => {

  let cacheServiceMock: CacheService;
  let userServiceMock: UserService;
  let workspaceStoreMock: WorkspaceStore;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let initAppSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ModalModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: CacheService, useValue: createCacheServiceMock()},
        {provide: UserService, useValue: createUserServiceMock()},
        {provide: WorkspaceStore, useValue: createWorkspaceStoreMock()}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    cacheServiceMock = TestBed.inject(CacheService);
    userServiceMock = TestBed.inject(UserService);
    workspaceStoreMock = TestBed.inject(WorkspaceStore);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    initAppSpy = jest.spyOn(app, "initApp");
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('Should call cacheService.getItem with CacheKeys.User', () => {
      expect(jest.spyOn(cacheServiceMock, 'getItem')).toHaveBeenCalledWith(CacheKeys.User);
    });

    it('Should call initApp with user from cache', () => {
      expect(initAppSpy).toHaveBeenCalledWith(MOCK_USER);
    });
  });

  describe('initApp', () => {

    it('Should call userService.login', () => {
      expect(userServiceMock.login).toHaveBeenCalledWith(MOCK_USER);
    });

    it('Should call workspaceStore.init', () => {
      expect(workspaceStoreMock.init).toHaveBeenCalledWith(MOCK_USER.id);
    });
  });
});
