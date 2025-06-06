import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ENCRYPTION_KEY_NAME } from './lib/utils';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.jsx`,
      import.meta.glob('./pages/**/*.jsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    if (props.initialPage.props.auth.user === null) {
      localStorage.clear(ENCRYPTION_KEY_NAME);
    }
    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});
