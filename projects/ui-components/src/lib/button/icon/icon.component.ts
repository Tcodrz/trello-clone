import { Component, ElementRef, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
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
  faTags,
  faTag,
  faCheckSquare,
  faClock,
  faPaperclip,
  faArrowRight,
  faPaste,
} from '@fortawesome/free-solid-svg-icons';
import { Icons } from './icons';



@Component({
  selector: 'ui-icon [icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      case Icons.Apple: return faApple;
      case Icons.ArrowRight: return faArrowRight;
      case Icons.BorderAll: return faBorderAll;
      case Icons.CheckSquare: return faCheckSquare;
      case Icons.ChevronDown: return faChevronDown;
      case Icons.ChevronLeft: return faChevronLeft;
      case Icons.ClipBoard: return faClipboard;
      case Icons.Clock: return faClock
      case Icons.EllipsisH: return faEllipsisH;
      case Icons.EllipsisV: return faEllipsisV;
      case Icons.Google: return faGoogle;
      case Icons.Heart: return faHeart;
      case Icons.Home: return faHome;
      case Icons.Microsoft: return faMicrosoft;
      case Icons.PaperClip: return faPaperclip;
      case Icons.Paste: return faPaste;
      case Icons.Plus: return faPlus;
      case Icons.Search: return faSearch;
      case Icons.Settings: return faScrewdriver;
      case Icons.Tag: return faTag;
      case Icons.Tags: return faTags;
      case Icons.Times: return faTimes;
      case Icons.Trello: return faTrello;
      case Icons.User: return faUser;
      case Icons.Users: return faUsers;
      default: return null;
    }
  }

}
