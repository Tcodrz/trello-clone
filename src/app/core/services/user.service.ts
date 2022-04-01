import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { StateService } from './../../state/state.service';
import { CacheKeys, CacheService } from './cache.service';
import { GotoService } from './goto.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private auth: AngularFireAuth,
    private cacheService: CacheService,
    private firestore: AngularFirestore,
    private goto: GotoService,
    private state: StateService,
  ) { }
  getUser(): Observable<User | null> {
    return this.state.getUser();
  }
  register(user: Partial<User>) {
    const collection = this.firestore.collection('users');
    const id = this.firestore.createId();
    collection.doc(id).set(user).then(ref => {
      console.log(ref);
      // TODO: IMPLEMENT SIGNIN WITH EMAIL AND PASSWORD
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
