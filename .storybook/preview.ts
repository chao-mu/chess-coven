import type { Preview } from "@storybook/react";
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import '!style-loader!css-loader!postcss-loader!../src/app/globals.css';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
};

export default preview;
