import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {GotoService} from "../../core/services/goto.service";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";
import {WorkspaceStore} from "../../state/workspaces/workspaces.store";
import {createWorkspaceStoreMock} from "../../mocks/workspace-store.mock";
import {UserStore} from "../../state/user/user.store";
import {createUserStoreMock} from "../../mocks/user-store.mock";
import {RouterTestingModule} from "@angular/router/testing";
import {MockComponent} from "ng-mocks";
import {LayoutComponent} from "../layout/layout.component";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponent(LayoutComponent)
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: GotoService,
          useValue: createGotoServiceMock()},
        {
          provide: WorkspaceStore,
          useValue: createWorkspaceStoreMock({
            currentWorkspace:null,
            workspaces: []})},
        {
          provide: UserStore,
          useValue: createUserStoreMock({
            user:null})
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
