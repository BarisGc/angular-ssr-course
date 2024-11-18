import {IMAGE_CONFIG} from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi, withFetch} from '@angular/common/http';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {
  InMemoryScrollingOptions,
  InMemoryScrollingFeature,
  withInMemoryScrolling,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {environment} from 'src/environments/environment.prod';
import {routes} from './app.routes';
import {JwtModule} from '@auth0/angular-jwt';
import {provideToastr} from 'ngx-toastr';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'enabled',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * barisd:
     * Development mode'da NgOptimizedImage uyarılarını kapatmak için kullanılır.
     * Image optimizasyonu için NgOptimizedImage direktifi ve ilgili yönergeler yerine farklı yöntemler kullanılmış, bu sebeple problem olsa da olmasa da(not: problem olup olmaması ayrı bir konu) uyarı veriliyor. Developer tools'daki konsol çıktıları debug yapılamaz hale geliyor.
     */
    {
      provide: IMAGE_CONFIG,
      useValue: {disableImageSizeWarning: true, disableImageLazyLoadWarning: true},
    },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('userToken'),
          allowedDomains: [environment.baseUrl],
        },
      }),
    ),
    {
      provide: 'baseUrl',
      useValue: environment.apiUrl,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(routes, inMemoryScrollingFeature, withComponentInputBinding()),
    provideAnimations(),
    provideToastr(),
    provideClientHydration(withEventReplay()),
  ],
};
