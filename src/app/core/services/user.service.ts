import { CacheKeys, CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import * as UserActions from 'src/app/state/user/user.actions';
import { User } from 'src/app/state/user/user.reducer';
import { StoreService } from './../../state/state.service';
import { UserState } from './../../state/user/user.reducer';
import { GotoService } from './goto.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private store: StoreService,
    private goto: GotoService,
    private cacheService: CacheService,
    private auth: AngularFireAuth,
  ) { }

  register(user: Partial<User>) {
    this.store.dispatch(UserActions.Login(user as User));
    this.goto.dashboard();
  }
  signInWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(creds => {
      const user: User = {
        id: creds.user?.uid as string,
        name: creds.user?.displayName as string,
        email: creds.user?.email as string,
        picture: creds.user?.photoURL as string,
      }
      this.store.dispatch(UserActions.Login(user));
      this.cacheService.setItem(CacheKeys.User, user);
      this.goto.dashboard();
    });
  }
  isLoggedIn(): Observable<boolean> {
    return this.store.select('userState').pipe(
      map(userState => (userState as UserState).isLoggedIn)
    );
  }
}
