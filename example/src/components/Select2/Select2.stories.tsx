import {Flex} from '@acrool/react-grid';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {options} from '../../config/data';
import Select2 from './Select2';

const meta = {
    title: 'Example/Select2',
    component: Select2,
    parameters: {
        layout: 'centered',
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
        options,
        isAvatarEnable: true,
        isSearchEnable: true,
        value: '1',
    },
} satisfies Meta<typeof Select2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Select2
            {...args}
            value={value}
            options={options}
            onChange={onChange}
        />;
    },
};



export const WithStaticVertical: Story = {
    args: {},
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2 align-items-start" style={{padding: '600px 0'}}>

            <Select2
                {...args}
                value={value}
                options={options}
                onChange={onChange}
            />

        </Flex>;
    },
};

export const WithFixedVertical: Story = {
    args: {},
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex col="column" className="gap-2 align-items-start">

            <div style={{position: 'fixed', top: '120px'}}>
                <Select2
                    {...args}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </div>
            <div style={{position: 'fixed', bottom: '120px'}}>
                <Select2
                    {...args}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </div>
        </Flex>;
    },
};


export const WithHotkeyTab: Story = {
    args: {},
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2 align-items-start">
            <input type="text" placeholder="input order 1"/>
            <Select2
                {...args}
                value={value}
                options={options}
                onChange={onChange}
            />
            <input type="text" placeholder="input order 3"/>
        </Flex>;
    },
};

