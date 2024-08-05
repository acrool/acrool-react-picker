import {animation, createPicker, IPickerOptions, usePicker} from '@acrool/react-picker';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';





const pickerProps: IPickerOptions = {
    variants: animation.slideInUp,
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
const SliderUp = createPicker(
    () => {
        const {hide} = usePicker();
        const navigate = useNavigate();

        return <SliderUpRoot>
            <div>RightSlider content</div>

            <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashPicker 1</button>
            <button type="button" onClick={hide}>X </button>

        </SliderUpRoot>;
    }
    ,pickerProps);

export default SliderUp;


const SliderUpRoot = styled.div`
  width: 100vw;
  height: 200px;


  
  background-color: #2b3035;
  padding: 40px 20px;
`;
