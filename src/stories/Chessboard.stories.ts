import type { Meta, StoryObj } from '@storybook/nextjs';

import { Chessboard } from '@/components/Chessboard';

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

export const WithPieces: Story = {
  args: {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 3',
  },
};

export const WithPiecesFlipped: Story = {
  args: {
    flipped: true,
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 3',
  }
}

export const WithPiecesAsymetric: Story = {
  args: {
    fen: 'r1bBk2r/pppn1ppp/8/3n4/1b1P4/8/PP1QPPPP/R3KBNR b KQkq - 2 8',
  },
};
