import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kndg.online',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
