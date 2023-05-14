import React from 'react'

import { ThemeProvider } from '@mui/material'
import theme from '../src/theme/primaryTheme'

import '../src/styles/scss/main.scss'
import '../src/styles/scss/storybook.scss'

const preview = {
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
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
]

export default preview
