import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {useDarkMode} from 'storybook-dark-mode';

import KeyboardPickerField from './KeyboardPickerField';

const meta = {
    title: 'Example/KeyboardPickerField',
    component: KeyboardPickerField,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {
        onChange: fn(),
        value: '',
    },
} satisfies Meta<typeof KeyboardPickerField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    render: function Render(args) {
        const isDark = useDarkMode();
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <KeyboardPickerField
            {...args}
            isDark={isDark}
            value={value}
            onChange={onChange}
        />;
    },
};


