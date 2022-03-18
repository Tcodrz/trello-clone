import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser, faClipboard, faBorderAll, faHome, faChevronLeft, } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faMicrosoft, faApple, faTrello } from '@fortawesome/free-brands-svg-icons';

export enum Icons {
  None = '',
  User = 'faUser',
  Google = 'faGoogle',
  Microsoft = 'faMicrosoft',
  Apple = 'faApple',
  ClipBoard = 'faClipboard',
  BorderAll = 'faBorderAll',
  Home = 'faHome',
  ChevronLeft = 'faChevronLeft',
  Trello = 'faTrello',
}

@Component({
  selector: 'app-icon[icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnChanges {
  @Input() icon: Icons = Icons.None;
  _icon: IconProp | null = null;
  constructor() { }

  ngOnChanges(): void {
    this._icon = this.getIcon(this.icon);
  }

  getIcon(icon: Icons): IconProp | null {
    switch (icon) {
      case Icons.User: return faUser;
      case Icons.Google: return faGoogle;
      case Icons.Microsoft: return faMicrosoft;
      case Icons.Apple: return faApple;
      case Icons.ClipBoard: return faClipboard;
      case Icons.BorderAll: return faBorderAll;
      case Icons.Home: return faHome;
      case Icons.ChevronLeft: return faChevronLeft;
      case Icons.Trello: return faTrello;
      default: return null;
    }
  }

}
