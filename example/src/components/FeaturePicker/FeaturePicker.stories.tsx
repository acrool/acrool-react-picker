import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {optionsSmall} from '../../config/data';
import FeaturePicker from './FeaturePicker';

const meta = {
    title: 'Example/FeaturePicker',
    component: FeaturePicker,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Demonstrate how to use FeaturePicker + Dropdown to complete the function'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        options: optionsSmall,
    },
} satisfies Meta<typeof FeaturePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

