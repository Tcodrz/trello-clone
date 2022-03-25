import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from './core/interface/user.interface';
import { CacheKeys, CacheService } from './core/services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private cacheService: CacheService,
    private userService: UserService
  ) { }
  ngOnInit() {
    const user = this.cacheService.getItem<User>(CacheKeys.User);
    if (!!user) {
      this.userService.login(user);
    }
  }
}
