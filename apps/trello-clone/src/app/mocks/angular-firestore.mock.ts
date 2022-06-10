import {AngularFirestore} from "@angular/fire/compat/firestore";
import {of} from "rxjs";

export type AngularFirestoreMock = Partial<Record<keyof AngularFirestore, jest.Mock>>;

export function createFirestoreMock<T>(item: T, items: T[]): AngularFirestoreMock {
  return {
    doc: jest.fn().mockReturnValue({
      valueChanges: jest.fn().mockReturnValue(of(item)),
      set: jest.fn()
    }),
    collection: jest.fn().mockReturnValue(of(items)),
    createId: jest.fn().mockReturnValue('1234')
  }
}
