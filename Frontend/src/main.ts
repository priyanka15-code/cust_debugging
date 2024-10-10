import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { disableConsoleInProduction } from './polyfills';
import { AppModule } from './app/app.module';


disableConsoleInProduction();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
