import {animation, createPicker, IPickerOptions, usePicker} from '@acrool/react-picker';
import styled from 'styled-components';

import Card from '../../components/Card';


interface IProps {
    myVar?: string
}


const pickerOptions: IPickerOptions = {
    variants: animation.zoomInDown,
    className: 'p-3',
    // isEnableClickMaskHide: true,
};

/**
 * 優惠活動光箱
 *
 * PS: 示範用客製化光箱
 */
const PromotionPickerPartialArgs = createPicker(
    ({myVar}: IProps) => {
        const {hide} = usePicker();

        return <CreateTaskPickerRoot>
            <Card title="Create Picker" direction="column">
                <div>Test not all required {myVar}</div>
            </Card>

            <button type="button" onClick={hide}>X </button>
        </CreateTaskPickerRoot>;
    }
    , pickerOptions);

export default PromotionPickerPartialArgs;



const CreateTaskPickerRoot = styled.div`
  width: 400px;
  margin: 0 auto;
`;
