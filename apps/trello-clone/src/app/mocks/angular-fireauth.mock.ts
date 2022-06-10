import {AngularFireAuth} from "@angular/fire/compat/auth";

export type AngularFireauthMock = Partial<Record<keyof AngularFireAuth, jest.Mock>>;

export function createAngularFireAuthMock(): AngularFireauthMock {
  return {
    signInWithPopup: jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          user: {
            id: '1',
            name: 'mock user',
            email: 'mock@email',
            picture: 'mock-picture',
          }
        })
      });
    }),
  }
}
