import type { Meta, StoryObj } from '@storybook/nextjs';

import { MemorizerNav } from '@/components/MemorizerNav';

const meta: Meta<typeof MemorizerNav> = {
  component: MemorizerNav,
};

export default meta;
type Story = StoryObj<typeof MemorizerNav>;

export const Default: Story = {
  args: {
    // None
  },
};
