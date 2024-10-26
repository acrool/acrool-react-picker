import {Flex} from '@acrool/react-grid';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {useDarkMode} from 'storybook-dark-mode';

import DateField from './DateField';

const meta = {
    title: 'Example/DateField',
    component: DateField,
    parameters: {
        // layout: 'centered',
    },
    argTypes: {},
    args: {
        onChange: fn(),
        value: '',
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex column className="gap-3" style={{width: '250px'}}>
            <div>Current Value: {value}</div>
            <DateField
                {...args}
                isDark={isDark}
                value={value}
                onChange={onChange}
            />
        </Flex>;
    },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
