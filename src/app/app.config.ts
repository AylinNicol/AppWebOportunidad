import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
/*import { provideClientHydration } from '@angular/platform-browser';*/
import { provideFirebase } from './services/firebase';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }) /*, provideClientHydration()*/,
    provideFirebase({
      apiKey: 'AIzaSyBiqeri0W2nm8Hd40YbG0W0CYkGK0gBt-0',
      authDomain: 'conecta-oportunidad.firebaseapp.com',
      projectId: 'conecta-oportunidad',
      storageBucket: 'conecta-oportunidad.firebasestorage.app',
      messagingSenderId: '627406042423',
      appId: '1:627406042423:web:3e21449bf81348ef5a96b2',
      measurementId: 'G-HHTFY1XVMC',
    }),
  ],
};
