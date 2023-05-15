import type { Meta, StoryObj } from '@storybook/react';

import MemorizerPage from '../app/memorizer/page';

const meta: Meta<typeof MemorizerPage> = {
  component: MemorizerPage,
};

export default meta;
type Story = StoryObj<typeof MemorizerPage>;

export const Default: Story = {
  args: {
  },
};
