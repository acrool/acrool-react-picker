import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import TextPickerField from './TextPickerField';
import {useDarkMode} from "storybook-dark-mode";

const meta = {
    title: 'Example/TextPickerField',
    component: TextPickerField,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Demonstrate how to use TextPickerField + Dropdown to complete the function'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        value: '',
    },
} satisfies Meta<typeof TextPickerField>;

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

        return <TextPickerField
            {...args}
            isDark={isDark}
            value={value}
            onChange={onChange}
        />;
    },
};


