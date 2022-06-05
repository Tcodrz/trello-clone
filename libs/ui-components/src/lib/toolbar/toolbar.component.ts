import { Component, Input } from '@angular/core';
import { ToolbarItem } from "../../interface/toolbar-item.interface";

@Component({
  selector: 'ui-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  @Input() items: ToolbarItem[] = [];

  public onItemClick(item: ToolbarItem): void {
    if (item.action) item.action();
  }
}
