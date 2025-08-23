// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    isr: {
      expiration: false,
    },
  }),
  integrations: [mdx({
    shikiConfig: {
      theme: "rose-pine",
    },
    gfm: true,
    syntaxHighlight: {
      type: 'shiki',
    }
  })]
});
