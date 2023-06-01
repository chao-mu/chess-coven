import type { Meta, StoryObj } from "@storybook/react";

import { GameStartScreen } from "@/components/GameStartScreen";

const meta: Meta<typeof GameStartScreen> = {
  component: GameStartScreen,
};

export default meta;
type Story = StoryObj<typeof GameStartScreen>;

export const Example: Story = {
  args: {
    onGameStart: () => {
      console.log("onGameStart");
    },
    title: "Enchant the Undefended",
    story:
      "You are a wizard in a tower. You have a spellbook and a wand. Cast spells on the undefended pieces below",
    rules:
      "Click undefended pieces and pawns. Kings can't defend attacked squares. Next puzzle will show once all solutions are selected.",
  },
};
