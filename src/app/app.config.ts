import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './core/services/interceptors';
import { initializeApp } from './core/services/app.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([authTokenInterceptor]) // Register the interceptor
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
        height: '30px',
      },
    }),
    provideAppInitializer(initializeApp)
  ]
};
