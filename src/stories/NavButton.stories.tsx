import type { Meta, StoryObj } from "@storybook/react";

import { NavButton } from "@/components/NavButton";

const meta: Meta<typeof NavButton> = {
  component: NavButton,
};

export default meta;
type Story = StoryObj<typeof NavButton>;

export const Left: Story = {
  args: {
    text: "left",
  },
};

export const Right: Story = {
  args: {
    text: "right",
  },
};

export const RightNumeric: Story = {
  args: {
    text: "8",
  },
};

export const LeftNumeric: Story = {
  args: {
    text: "8",
  },
};
