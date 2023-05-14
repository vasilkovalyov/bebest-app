import type { Meta, StoryObj } from '@storybook/react'

import Typography from '@mui/material/Typography'

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
}
export default meta

type Story = StoryObj<typeof Typography>

export const Default: Story = {
  render: () => (
    <>
      <Typography variant="h1">Typography 1</Typography>
      <Typography variant="h2">Typography 2</Typography>
      <Typography variant="h3">Typography 3</Typography>
      <Typography variant="h4">Typography 4</Typography>
      <Typography variant="h5">Typography 5</Typography>
      <Typography variant="h6">Typography 6</Typography>
      <Typography variant="body1">body1</Typography>
      <Typography variant="body2">body2</Typography>
      <Typography variant="subtitle1">subtitle1</Typography>
      <Typography variant="subtitle2">subtitle2</Typography>
    </>
  ),
}
