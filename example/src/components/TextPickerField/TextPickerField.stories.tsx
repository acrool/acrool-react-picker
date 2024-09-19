import {Flex} from '@acrool/react-grid';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {options} from '../../config/data';
import TextPickerField from './TextPickerField';

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
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <TextPickerField
            {...args}
            value={value}
            onChange={onChange}
        />;
    },
};


