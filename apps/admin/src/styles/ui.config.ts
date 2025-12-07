import { defineConfig } from '@chakra-ui/react';

export const uiConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: '"Open Sans", sans-serif' },
        heading: { value: '"Open Sans", sans-serif' },
        mono: { value: '"JetBrains Mono", monospace' },
      },
      // fontSizes: {},
      // colors: {},
      // sizes: {},
      // spacing: {},
    },
  },
});
