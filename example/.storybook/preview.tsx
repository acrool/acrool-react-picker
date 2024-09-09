import type { Preview } from "@storybook/react";
// import './reset.css';
import '@acrool/react-picker/dist/index.css';
import '@acrool/react-dropdown/dist/index.css';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
      (Story) => (
          <Story />
      ),
  ],
};

export default preview;
