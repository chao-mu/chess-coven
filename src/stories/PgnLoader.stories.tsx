import type { Meta, StoryObj } from '@storybook/nextjs';

import { PgnLoader } from '@/components/PgnLoader';

const meta: Meta<typeof PgnLoader> = {
  component: PgnLoader,
};

export default meta;
type Story = StoryObj<typeof PgnLoader>;

export const Default: Story = {
  args: {
  },
};
