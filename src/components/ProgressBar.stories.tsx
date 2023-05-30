import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "@/components/ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Half: Story = {
  args: {
    progress: 50,
  },
};
