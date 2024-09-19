import {Flex} from '@acrool/react-grid';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {options} from '../../config/data';
import DateField from './DateField';
import DateFieldWithConfirm from './DateFieldWithConfirm';

const meta = {
    title: 'Example/DateFieldWithConfirm',
    component: DateFieldWithConfirm,
    parameters: {
        // layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Demonstrate how to use Select2 + Dropdown to complete the function'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        value: '',
    },
} satisfies Meta<typeof DateFieldWithConfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex col="column" style={{width: '250px'}}>
            <div>Current Value: {value}</div>
            <DateFieldWithConfirm
                {...args}
                value={value}
                onChange={onChange}
            />
        </Flex>;
    },
};


