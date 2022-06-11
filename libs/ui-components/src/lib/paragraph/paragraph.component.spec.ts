import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonComponent, Icons, ParagraphComponent, UiButton} from '@ui-components';
import {By} from "@angular/platform-browser";
import {MockComponent} from "ng-mocks";

describe('ParagraphComponent', () => {
  let component: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ParagraphComponent,
        MockComponent(ButtonComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    component = fixture.componentInstance;
    component.title = 'mock title';
    component.text = 'mock text';
    component.dividerTop = true;
    component.dividerBottom = true;
    component.textLink = {
      className: "123",
      icon: Icons.User,
      text: "mock button"
    } as UiButton;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render the correct title', () => {
    const titleElement = fixture.debugElement.query(By.css('.title'))
    expect(titleElement.nativeElement.textContent).toEqual('mock title');
  });

  it('Should render the correct text when text is defined', () => {
    const textElement = fixture.debugElement.query(By.css('.text'));
    expect(textElement.nativeElement.textContent).toEqual('mock text');
  });

  it('Should create a divider top when dividerTop is true', () => {
    const dividerTopElement = fixture.debugElement.queryAll(By.css('hr'))[0];
    expect(dividerTopElement).toBeTruthy();
  });

  it('Should create a divider bottom when dividerBottom is true', () => {
    const dividerBottomElement = fixture.debugElement.queryAll(By.css('hr'))[1];
    expect(dividerBottomElement).toBeTruthy();
  });

  it('Should create a text link when textLink is defined', () => {
    const textLinkElement = fixture.debugElement.query(By.css('.text-link'));
    expect(textLinkElement).toBeTruthy();
  });
});
