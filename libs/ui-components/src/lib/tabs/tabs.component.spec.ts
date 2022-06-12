import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Tab, TabsComponent} from '@ui-components';
import {MockComponent} from "ng-mocks";
import {TabPanel, TabView} from "primeng/tabview";

const mockTabs: Tab[] = [
  {
    title: 'Tab 1',
    id: 1,
  },
  {
    title: 'Tab 2',
    id: 2,
  },
  {
    title: 'Tab 3',
    id: 3,
  }
]

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TabsComponent,
        MockComponent(TabView),
        MockComponent(TabPanel)
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    component.tabs = mockTabs;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onTabChange', () => {
    beforeEach(() => {
      component.tabs = [{
        title: 'Tab 1',
        id: 1,
        action: jest.fn()
      },{
        title: 'Tab 2',
        id: 2,
      }];
      fixture.detectChanges()
    });

    it('Should call tab.action clicked when tab has action', () => {
      component.onTabChange({index: 0, originalEvent: {} as PointerEvent});
      expect(component.tabs[0].action).toHaveBeenCalled();
    });
  });
});
