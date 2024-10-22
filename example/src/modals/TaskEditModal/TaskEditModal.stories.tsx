import {Flex} from '@acrool/react-grid';
import {action} from '@storybook/addon-actions';
import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';

import Button from '../../components/atoms/Button';
import TaskEditModal from './TaskEditModal';
import {ModalPortal as OriginModalPortal} from "@acrool/react-modal";

const meta = {
    title: 'Example/TaskEditModal',
    component: TaskEditModal,
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
    args: {},
} satisfies Meta<typeof TaskEditModal>;

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
            <Button color="primary" size="md" onClick={TaskEditModal.show}>Open Task Edit Modal</Button>

        </Flex>;
    },
};
