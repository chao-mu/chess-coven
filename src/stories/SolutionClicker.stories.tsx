import type { Meta, StoryObj } from '@storybook/react';

import { SolutionClicker } from '@/components/SolutionClicker';
import undefendedPieces from '@/assets/puzzles/undefended.json';

const meta: Meta<typeof SolutionClicker> = {
  component: SolutionClicker,
};

export default meta;
type Story = StoryObj<typeof SolutionClicker>;

export const Example: Story = {
  args: {
    puzzles: undefendedPieces,
    title: 'Undefended Pieces/Pawns',
    rules: 'Click the undefended chessmen. Kings can\'t defend attacked pieces.',
  },
};