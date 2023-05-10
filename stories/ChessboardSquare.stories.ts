import type { Meta, StoryObj } from '@storybook/react';

import { ChessboardSquare } from '../components/ChessboardSquare';

const meta: Meta<typeof ChessboardSquare> = {
  component: ChessboardSquare,
};

export default meta;
type Story = StoryObj<typeof ChessboardSquare>;

export const LightSquare: Story = {
  args: {
    isLight: true,
    piece: 'empty',
  },
};

export const DarkSquare: Story = {
  args: {
    isLight: false,
    piece: 'empty',
  },
};

export const LightSquareWithPiece: Story = {
  args: {
    isLight: true,
    piece: 'black-queen',
  },
};

export const DarkSquareWithPiece: Story = {
  args: {
    isLight: false,
    piece: 'white-queen',
  },
};
