import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-10be4","appId":"1:186433151287:web:1a6f3dd3024a752eadbab2","storageBucket":"ring-of-fire-10be4.appspot.com","apiKey":"AIzaSyAMPftm5SFWAKw2D1Q17cuTmfpbgwVDSVI","authDomain":"ring-of-fire-10be4.firebaseapp.com","messagingSenderId":"186433151287"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
