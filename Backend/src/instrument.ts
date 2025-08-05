// filepath: d:\Projekte\my-portfolio\Backend\src\instrument.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://0a699027a97f3d2da0806b50bc11c8d7@o4509718141992960.ingest.de.sentry.io/4509718303539280',
  tracesSampleRate: 1.0,
});

console.log('Sentry initialized');
