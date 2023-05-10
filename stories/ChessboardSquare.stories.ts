import type { Meta, StoryObj } from '@storybook/react';

// Chess.js
import { BLACK, WHITE, QUEEN, Piece } from 'chess.js'

// Components
import { ChessboardSquare } from '../components/ChessboardSquare';


const meta: Meta<typeof ChessboardSquare> = {
  component: ChessboardSquare,
};

export default meta;
type Story = StoryObj<typeof ChessboardSquare>;

export const LightSquare: Story = {
  args: {
    isLight: true,
  },
};

export const DarkSquare: Story = {
  args: {
    isLight: false,
  },
};

export const LightSquareWithWhitePiece: Story = {
  args: {
    isLight: true,
    piece: { color: WHITE, type: QUEEN } as Piece,
  },
};

export const LightSquareWithBlackPiece: Story = {
  args: {
    isLight: true,
    piece: { color: BLACK, type: QUEEN } as Piece,
  },
};

export const DarkSquareWithBlackPiece: Story = {
  args: {
    isLight: false,
    piece: { color: BLACK, type: QUEEN } as Piece,
  },
}

export const DarkSquareWithWhitePiece: Story = {
  args: {
    isLight: false,
    piece: { color: WHITE, type: QUEEN } as Piece,
  },
}
