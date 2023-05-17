import type { Meta, StoryObj } from '@storybook/react';

import { NavSquare } from '@/components/NavSquare';

const meta: Meta<typeof NavSquare> = {
  component: NavSquare,
};

export default meta;
type Story = StoryObj<typeof NavSquare>;

export const SimpleText: Story = {
  args: {
    title: "Click Undefended Pieces",
    description: "Click the undefended chessmen. Kings can't defend attacked pieces.",
  },
};
