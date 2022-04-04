import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Theme } from 'src/app/core/interface/themes';
import { MenuItem } from '../../../ui-components/menu/menu/menu.component';

@Component({
  selector: 'app-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLinksComponent implements OnInit, AfterViewInit {
  @Input() menuItems: MenuItem[] | null = [];
  @Input() theme: Theme | undefined;
  @ViewChild('links') links: ElementRef | undefined;
  linkStyles = {};
  constructor(
    private renderer: Renderer2,
  ) { }
  ngAfterViewInit(): void {
    this.initStyles();
  }
  ngOnInit(): void {
  }
  initStyles() {
    this.setLinksStyle({
      color: this.theme?.sidebarText,
      backgroundColor: 'initial'
    });

  }
  onItmeClick(item: MenuItem) {
    if (!!item.command) item.command();
  }
  onLinkHover(index: number) {
    this.setSingleLinkSyle({
      backgroundColor: this.theme?.sidebarLinksHover
    }, index);
  }
  onLinkBlur(index: number) {
    this.setSingleLinkSyle({
      backgroundColor: 'initial'
    }, index);
  }
  setLinksStyle(styles: object) { // set styles to all links
    if (!!this.links) {
      const collection = (this.links.nativeElement.children as HTMLCollection);
      let i = 0;
      while (i < collection.length) {
        const parent = collection.item(i) as HTMLDivElement;
        const element = parent.children.item(0) as HTMLAnchorElement;
        Object.assign(element.style, styles);
        i++;
      }
    }
  }
  setSingleLinkSyle(styles: object, index: number) {
    if (!!this.links) {
      const collection = this.links.nativeElement.children as HTMLCollection;
      const element = collection.item(index)?.children.item(0) as HTMLAnchorElement;
      Object.assign(element.style, styles);
    }
  }

}
