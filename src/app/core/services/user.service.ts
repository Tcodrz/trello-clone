import { StoreService } from './../../state/state.service';
import { Injectable } from '@angular/core';
import * as UserActions from 'src/app/state/user/user.actions';
import { User } from 'src/app/state/user/user.reducer';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private store: StoreService,
  ) { }

  register(user: Partial<User>) {
    this.store.dispatch(UserActions.Login(user as User));
  }
  isLoggedIn(): Observable<boolean> {
    return this.store.select('userState').pipe(
      map(userState => userState.isLoggedIn)
    );
  }
}
