import type { Preview } from '@storybook/react';

import '../src/styles/scss/main.scss';
import '../src/styles/scss/storybook.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'story',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Design System',
          ['Welcome'],
          'Foundation',
          'Components',
          'Form',
          'Pages',
        ],
      },
    },
    docs: {
      inlineStories: false,
    },
    previewTabs: {
      canvas: {
        title: 'Preview',
        hidden: false,
      },
      'storybook/docs/panel': {
        title: 'Doc',
        hidden: false,
      },
    },
  },
};

export default preview;
