import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Logout } from './../../state/user/user.actions';
import { CacheKeys, CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import * as UserActions from 'src/app/state/user/user.actions';
import { User } from 'src/app/state/user/user.reducer';
import { StateService } from './../../state/state.service';
import { UserState } from './../../state/user/user.reducer';
import { GotoService } from './goto.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private state: StateService,
    private goto: GotoService,
    private cacheService: CacheService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  register(user: Partial<User>) {
    const collection = this.firestore.collection('users');
    const id = this.firestore.createId();
    collection.doc(id).set(user).then(ref => {
      console.log(ref);
      // this.goto.dashboard();
    });
  }
  signInWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(creds => {
      const user: User = {
        id: creds.user?.uid as string,
        name: creds.user?.displayName as string,
        email: creds.user?.email as string,
        picture: creds.user?.photoURL as string,
      }
      this.state.setUser(user);
      this.cacheService.setItem(CacheKeys.User, user);
      this.goto.dashboard();
    });
  }
  logout() {
    this.state.setUser(null);
  }
  login(user: User): void {
    this.state.setUser(user);
  }
}
