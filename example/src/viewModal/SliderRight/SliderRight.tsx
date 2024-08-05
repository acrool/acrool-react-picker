import {animation, createPicker, IPickerOptions, usePicker} from '@acrool/react-picker';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';





const pickerProps: IPickerOptions = {
    variants: animation.slideInLeft,
    isEnableHideWithClickMask: true
    // variants: {
    //     initial: {transform: 'scale(0)'},
    //     show: {transform: 'scale(1)'},
    //     exit: {transform: 'scale(0)'},
    // },
};
// const pickerPropsUndefined: IPickerProps|undefined = undefined;

/**
 * 右側抽屜
 *
 * PS: 示範用客製化光箱
 */
const SliderRight = createPicker(
    () => {
        const {hide} = usePicker();
        const navigate = useNavigate();

        return <SliderRightRoot>
            <div>RightSlider content</div>

            <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashPicker 1</button>
            <button type="button" onClick={hide}>X </button>

        </SliderRightRoot>;
    }
    ,pickerProps
);

export default SliderRight;


const SliderRightRoot = styled.div`
  width: 300px;
  height: 100vh;


  
  background-color: #2b3035;
  padding: 40px 20px;
`;
