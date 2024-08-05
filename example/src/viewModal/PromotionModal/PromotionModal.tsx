import {animation, createPicker, IPickerOptions, usePicker} from '@acrool/react-picker';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

import Card from '../../components/Card';




const pickerProps: IPickerOptions = {
    variants: animation.fadeInDown,
    // variants: {
    //     initial: {transform: 'scale(0)'},
    //     show: {transform: 'scale(1)'},
    //     exit: {transform: 'scale(0)'},
    // },
    className: 'p-3'
};
// const pickerPropsUndefined: IPickerProps|undefined = undefined;

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const PromotionPicker = createPicker(
    () => {
        const {hide} = usePicker();
        const navigate = useNavigate();

        return <CreateTaskPickerRoot>
            <Card title="Create Picker" direction="column">
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
                <div>Test2 content</div>
            </Card>

            <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashPicker 1</button>
            <button type="button" onClick={hide}>X </button>

        </CreateTaskPickerRoot>;
    }
    ,pickerProps);

export default PromotionPicker;


const CreateTaskPickerRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
