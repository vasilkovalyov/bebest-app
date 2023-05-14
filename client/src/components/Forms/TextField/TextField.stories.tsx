import type { Meta, StoryObj } from '@storybook/react'

import TextField from '@mui/material/TextField'

const meta: Meta<typeof TextField> = {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    variant: 'standard',
    label: 'Label text field',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  },
  render: (args) => <TextField {...args} />,
}

export const ErrorValidation: Story = {
  args: {
    variant: 'standard',
    label: 'Label text field',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    error: true,
    helperText: 'Error text',
  },
  render: (args) => <TextField {...args} />,
}
