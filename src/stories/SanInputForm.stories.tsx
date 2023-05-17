import type { Meta, StoryObj } from '@storybook/react';

import { SanInputForm } from '@/components/SanInputForm';

const meta: Meta<typeof SanInputForm> = {
  component: SanInputForm,
};

export default meta;
type Story = StoryObj<typeof SanInputForm>;

export const Default: Story = {
  args: {
    // None
  },
};
