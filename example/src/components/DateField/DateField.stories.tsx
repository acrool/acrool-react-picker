import {Flex} from '@acrool/react-grid';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import DateField from './DateField';
import DateFieldWithConfirm from './DateFieldWithConfirm';

const meta = {
    title: 'Example/DateField',
    component: DateField,
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
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex column className="gap-3" style={{width: '250px'}}>
            <div>Current Value: {value}</div>
            <DateField
                {...args}
                value={value}
                onChange={onChange}
            />
        </Flex>;
    },
};
