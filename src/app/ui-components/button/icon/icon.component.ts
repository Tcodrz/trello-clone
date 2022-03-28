import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faApple, faGoogle, faMicrosoft, faTrello } from '@fortawesome/free-brands-svg-icons';
import {
  faBorderAll,
  faChevronDown,
  faChevronLeft,
  faClipboard,
  faHome,
  faPlus,
  faUser,
  faUsers,
  faHeart,
  faScrewdriver,
  faSearch,
  faEllipsisV,
  faEllipsisH,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Icons } from './icons';



@Component({
  selector: 'app-icon[icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnChanges {
  @Input() icon: Icons | undefined = Icons.None;
  _icon: IconProp | null = null;
  constructor(
    public elementRef: ElementRef,
  ) { }

  ngOnChanges(): void {
    if (!!this.icon)
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
      case Icons.Plus: return faPlus;
      case Icons.ChevronDown: return faChevronDown;
      case Icons.Heart: return faHeart;
      case Icons.Users: return faUsers;
      case Icons.Settings: return faScrewdriver;
      case Icons.Search: return faSearch;
      case Icons.EllipsisH: return faEllipsisH;
      case Icons.EllipsisV: return faEllipsisV;
      case Icons.Times: return faTimes;
      default: return null;
    }
  }

}
