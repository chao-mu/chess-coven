import type { Meta, StoryObj } from '@storybook/react';

import { Chessboard } from '../components/Chessboard';

const meta: Meta<typeof Chessboard> = {
  component: Chessboard,
};

export default meta;
type Story = StoryObj<typeof Chessboard>;

export const Empty: Story = {
  args: {
    // None
  },
};
