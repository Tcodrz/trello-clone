import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ButtonModule} from "@ui-components";
import {CacheKeys, CacheService} from "../../core/services/cache.service";
import {createCacheServiceMock} from "@trello-clone/trello-mocks";
import * as utils from "../../core/utils/utils";

describe('HomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let cacheServiceMock: CacheService;
  let isDevSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      imports: [RouterTestingModule, ButtonModule],
      providers: [
        {provide: CacheService, useValue: createCacheServiceMock()}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    cacheServiceMock = TestBed.inject(CacheService);
    isDevSpy = jest.spyOn(utils, 'isDev');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('Should call cacheService.deleteitem with currentWorkspace key', () => {
      expect(cacheServiceMock.deleteItem).toHaveBeenCalledWith(CacheKeys.CurrentWorkspace);
    });

    it('Should call cahceService.deleteItem with cuurentBoard Key', () =>{
      expect(cacheServiceMock.deleteItem).toHaveBeenCalledWith(CacheKeys.CurrentBoard);
    });

    it('Should call isDev', () => {
      expect(isDevSpy).toHaveBeenCalled();
    })
  })
});
