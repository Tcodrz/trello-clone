import { Component, Input } from '@angular/core';
import { Tab } from "../../interface/tabs.interface";

@Component({
  selector: 'ui-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeIndex = 0;

  onTabChange(event: { index: number; originalEvent: PointerEvent}): void {
    const tab = this.tabs[event.index];
    if (tab.action) tab.action();
  }
}
