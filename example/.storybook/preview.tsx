import type { Preview } from "@storybook/react";
// import './reset.css';
import '@acrool/react-picker/dist/index.css';
import '@acrool/react-datepicker/dist/index.css';
import '@acrool/react-dropdown/dist/index.css';
import '@acrool/react-skeleton/dist/index.css';
import '@acrool/react-modal/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";
import {ModalPortal as OriginModalPortal} from "@acrool/react-modal";


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
          <GridThemeProvider>
            <Story />
              <OriginModalPortal/>

          </GridThemeProvider>
      ),
  ],
};

export default preview;
