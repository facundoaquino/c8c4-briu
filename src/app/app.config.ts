import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment.development';
import { ProductsState } from './store/products/products.state';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      NgxsModule.forRoot([ProductsState], {
        developmentMode: !environment.production,
      })
    ),]
};
