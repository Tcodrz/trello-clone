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
    private auth: AngularFireAuth,
  ) { }

  register(user: Partial<User>) {
    this.store.dispatch(UserActions.Login(user as User));
    this.goto.dashboard();
  }
  signInWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(creds => {
      if (creds.additionalUserInfo?.profile) {
        const profile = creds.additionalUserInfo.profile.valueOf() as User;
        this.store.dispatch(UserActions.Login(profile));
        this.goto.dashboard();
      }
    });
  }
  isLoggedIn(): Observable<boolean> {
    return this.store.select('userState').pipe(
      map(userState => (userState as UserState).isLoggedIn)
    );
  }
}
