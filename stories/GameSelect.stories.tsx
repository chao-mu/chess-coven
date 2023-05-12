import type { Meta, StoryObj } from '@storybook/react';

import { GameSelect } from '../components/GameSelect';

const meta: Meta<typeof GameSelect> = {
  component: GameSelect,
};

export default meta;
type Story = StoryObj<typeof GameSelect>;

export const Default: Story = {
  args: {
    // None
  },
};
