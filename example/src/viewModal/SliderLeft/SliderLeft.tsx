import {animation, createPicker, IPickerOptions, usePicker} from '@acrool/react-picker';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';





const pickerProps: IPickerOptions = {
    variants: animation.slideInRight,
    isEnableHideWithClickMask: true
    // variants: {
    //     initial: {transform: 'scale(0)'},
    //     show: {transform: 'scale(1)'},
    //     exit: {transform: 'scale(0)'},
    // },
};
// const pickerPropsUndefined: IPickerProps|undefined = undefined;

/**
 * 優惠活動光箱2
 *
 * PS: 示範用客製化光箱
 */
const SliderLeft = createPicker(
    () => {
        const {hide} = usePicker();
        const navigate = useNavigate();

        return <SliderLeftRoot>
            <div>RightSlider content</div>

            <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashPicker 1</button>
            <button type="button" onClick={hide}>X </button>

        </SliderLeftRoot>;
    }
    ,pickerProps
);

export default SliderLeft;


const SliderLeftRoot = styled.div`
  width: 300px;
  height: 100vh;

  background-color: #2b3035;
  padding: 40px 20px;
`;
