import type { Meta, StoryObj } from '@storybook/react'

import Button from '@mui/material/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'inherit',
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
      ],
    },
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean', defaultValue: false },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'contained',
  },
  render: (args) => <Button {...args}>Button</Button>,
}
