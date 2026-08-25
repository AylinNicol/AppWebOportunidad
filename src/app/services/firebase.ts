import { isPlatformBrowser } from '@angular/common';
import {
  EnvironmentProviders,
  InjectionToken,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const FIREBASE_APP = new InjectionToken<FirebaseApp>('FirebaseApp');
export const FIRESTORE = new InjectionToken<Firestore>('Firestore');
export const STORAGE = new InjectionToken<FirebaseStorage>('Storage');
export const AUTH = new InjectionToken<Auth | null>('Auth');

export function provideFirebase(options: FirebaseOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: FIREBASE_APP,
      useFactory: () => (getApps().length ? getApp() : initializeApp(options)),
    },
    { provide: FIRESTORE, useFactory: () => getFirestore(inject(FIREBASE_APP)) },
    {
      provide: AUTH,
      useFactory: () =>
        isPlatformBrowser(inject(PLATFORM_ID)) ? getAuth(inject(FIREBASE_APP)) : null,
    },
    { provide: STORAGE, useFactory: () => getStorage(inject(FIREBASE_APP)) },
  ]);
}
