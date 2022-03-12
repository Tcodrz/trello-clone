import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faMicrosoft, faApple } from '@fortawesome/free-brands-svg-icons';

export enum Icons {
  None = '',
  User = 'faUser',
  Google = 'faGoogle',
  Microsoft = 'faMicrosoft',
  Apple = 'faApple,'
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
      default: return null;
    }
  }

}
