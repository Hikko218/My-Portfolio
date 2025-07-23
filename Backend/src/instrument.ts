// filepath: d:\Projekte\my-portfolio\Backend\src\instrument.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

console.log('Sentry initialized');
