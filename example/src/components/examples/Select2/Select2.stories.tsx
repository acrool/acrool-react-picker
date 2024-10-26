import {Flex} from '@acrool/react-grid';
import {action} from '@storybook/addon-actions';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {useEffect} from 'react';

import {options, optionsSmall} from '../../../config/data';
import OriginSelect from './OriginSelect';
import Select2 from './Select2';
import {useDarkMode} from "storybook-dark-mode";

const meta = {
    title: 'Example/Select2',
    component: Select2,
    parameters: {
        layout: 'centered',
    },
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
            action('onChange')(value);
            updateArgs({value});
        }

        return <Flex style={{marginTop: '500px', marginBottom: '900px'}}>
            
            <Select2
                {...args}
                value={value}
                options={options}
                onChange={onChange}
            />


        </Flex>;
    },
};



export const WithInputWidth: Story = {
    args: {},
    render: function Render(args) {
        const isDark = useDarkMode();
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            action('onChange')(value);
            updateArgs({value});
        }

        return <Flex column className="gap-2 align-items-start" style={{width: '300px'}}>

            <Select2
                {...args}
                isDark={isDark}
                value={value}
                options={options}
                onChange={onChange}
            />

            <Select2
                {...args}
                isDark={isDark}
                isBlock
                value={value}
                options={options}
                onChange={onChange}
            />

            <Select2
                {...args}
                isDark={isDark}
                value={value}
                isBlock
                isDropdownBlock
                options={options}
                onChange={onChange}
            />

        </Flex>;
    },
};

export const WithStaticVertical: Story = {
    args: {},
    render: function Render(args) {
        const isDark = useDarkMode();
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            action('onChange')(value);
            updateArgs({value});
        }

        return <Flex className="gap-2 align-items-start" style={{padding: '600px 0', width: '300px'}}>

            <Select2
                {...args}
                isDark={isDark}
                value={value}
                options={options}
                onChange={onChange}
            />

        </Flex>;
    },
};

export const WithFixedVertical: Story = {
    args: {
        isAvatarEnable: false,
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            action('onChange')(value);
            updateArgs({value});
        }

        return <Flex column className="gap-2 align-items-start">

            <div style={{position: 'fixed', top: '120px'}}>
                <Select2
                    {...args}
                    isDark={isDark}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </div>
            <div style={{position: 'fixed', bottom: '120px'}}>
                <Select2
                    {...args}
                    isDark={isDark}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            </div>
            <div style={{position: 'fixed', right: '40px'}}>
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


export const WithFixedModalVertical: Story = {
    args: {
        isAvatarEnable: false,
    },

    render: function Render(args) {
        const isDark = useDarkMode();
        const [{value}, updateArgs] = useArgs<{value: string}>();


        useEffect(() => {
            // 设置 body 的 overflow: none
            document.body.style.overflow = 'hidden';
            document.body.style.overscrollBehaviorX = 'contain';
            document.body.style.maxWidth = '100vw';

            return () => {
                // 恢复原来的样式
                document.body.style.overflow = '';
                document.body.style.overscrollBehaviorX = '';
                document.body.style.maxWidth = '';
            };
        }, []);

        function onChange(value: string) {
            action('onChange')(value);
            updateArgs({value});
        }

        return <>

            <div style={{
                position: 'fixed',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                overflow: 'hidden',
                overflowY: 'auto',
                backgroundColor: '#ccc'
            }}>
                <div style={{
                    width: '500px',
                    height: '1000px',
                    padding: '100px',
                }}>
                    <Select2
                        {...args}
                        isDark={isDark}
                        value={value}
                        options={options}
                        onChange={onChange}
                    />

                    <div style={{
                        marginTop: '300px',
                    }}>
                        <Select2
                            {...args}
                            isDark={isDark}
                            value={value}
                            options={options}
                            onChange={onChange}
                        />
                    </div>
                </div>

            </div>
        </>;
    },
};


export const WithHotkeyTab: Story = {
    args: {
        isSearchEnable: false,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        function onChange(value: string) {
            action('onChange')(value);
            updateArgs({value});
        }

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();

            action('onSubmit')();
        };

        return <form onSubmit={handleSubmit}>
            <Flex className="gap-2 align-items-start">
                <input type="text" placeholder="input order 1"/>
                <Select2
                    {...args}
                    value={value}
                    options={options}
                    onChange={onChange}
                />
                <input type="text" placeholder="input order 3"/>
                <select>
                    {optionsSmall.map(row => {
                        return <option value={row.value} key={row.value}>{row.text}</option>;
                    })}

                </select>

                <button type="submit">Submit</button>
            </Flex>
        </form>;
    },
};

