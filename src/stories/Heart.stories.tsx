import type { Meta, StoryObj } from '@storybook/nextjs';

import { Heart } from '@/components/Heart';

const meta: Meta<typeof Heart> = {
  component: Heart,
};

export default meta;
type Story = StoryObj<typeof Heart>;

export const Empty: Story = {
  args: {
    full: false,
  },
};

export const Full: Story = {
  args: {
    full: true,
  },
};
