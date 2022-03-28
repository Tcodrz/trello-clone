import { CacheService, CacheKeys } from './../../core/services/cache.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '../../ui-components/button/icon/icons';
import { isDev } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  Icons = Icons;
  isDev: boolean = false;
  constructor(
    private cache: CacheService,
  ) { }

  ngOnInit(): void {
    this.cache.deleteItem(CacheKeys.CurrentWorkspace);
    this.cache.deleteItem(CacheKeys.CurrentBoard);
    this.isDev = isDev();
  }

}
