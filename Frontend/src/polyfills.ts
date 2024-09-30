import { environment } from './environment/environment';

if (environment.production) {
  (function () {
    const noop = function () {};
    // Define method types explicitly
    const methods: Array<'log' | 'warn' | 'info'> = ['log', 'warn', 'info'];

    methods.forEach((method) => {
      (console as any)[method] = noop; 
    });
  })();
}
