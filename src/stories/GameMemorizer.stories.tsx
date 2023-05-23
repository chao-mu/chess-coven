import type { Meta, StoryObj } from '@storybook/nextjs';

import { GameMemorizer } from '@/components/GameMemorizer';

const meta: Meta<typeof GameMemorizer> = {
  component: GameMemorizer,
};

export default meta;
type Story = StoryObj<typeof GameMemorizer>;

export const Example: Story = {
  args: {
    pgn: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. cxd5 exd5 6. Nxd5 Nxd5 7. Bxd8 Bb4+ 8. Qd2 Bxd2+ 9. Kxd2 { 0-1 Black wins. } { Black is a piece up after Kxd8. } 0-1"
  },
};
