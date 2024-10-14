import { environment } from './environment/environment.prod';
/* import { environment } from './environment/environment';
 */
/* 
export function disableConsoleInProduction() {
if (environment.production) {
  (function () {
    const noop = function () {};
    const methods: Array<'log' | 'warn' | 'info' | 'error'> = ['log', 'warn', 'info', 'error'];

    methods.forEach((method) => {
      (console as any)[method] = noop; 
    }); 
  })();
}
} */
export function disableConsoleInProduction() {
  if (environment.production) {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    // Check if the environment is production and user logging status is set to false
    if (!user || (user.isLog === false)) {
      const noop = function () {};
      const methods: Array<'log' | 'warn' | 'info' | 'error'> = ['log', 'warn', 'info', 'error'];

      methods.forEach((method) => {
        (console as any)[method] = noop; 
      });
    }
  }
}
