import {picker} from '@acrool/react-picker';
import AcroolTable from '@acrool/react-table';
import {useNavigate} from 'react-router-dom';

import {PromotionPicker, PromotionPickerArgs, PromotionPickerPartialArgs} from '../../viewPicker/PromotionPicker';
import SliderRight from '../../viewPicker/SliderRight';
import SliderLeft from '../../viewPicker/SliderLeft';
import SliderUp from '../../viewPicker/SliderUp';


const Example = () => {
    const navigate = useNavigate();

    // const [visible, setVisible] = useState<EVisible>(EVisible.none);
    // const [isVisible, setVisible] = useState<boolean>(false);

    // const MyModel = CreateTaskPicker;

    return <div className="d-flex gap-3 w-100">

        <AcroolTable
            isDark
            isVisiblePaginate={false}
            tableCellMediaSize={768}
            gap="10px"
            title={{
                name: {text: 'Name', col: '450px'},
                use: {text: 'Use', col: true},
            }}
            data={[
                {
                    id: 1,
                    onClickRow: () => {
                        PromotionPicker.show();
                    },
                    field: {
                        name: 'Fast Show',
                        use: 'PromotionPicker.show()',
                    }
                },
                {
                    id: 2,
                    onClickRow: () => {
                        PromotionPickerArgs.show({myVar: 'xx'});
                    },
                    field: {
                        name: 'Fast Show Args',
                        use: 'PromotionPicker.showArgs({myVar: \'Imagine\'})',
                    }
                },
                {
                    id: 3,
                    onClickRow: () => {
                        PromotionPickerPartialArgs.show({myVar: 'x'});
                    },
                    field: {
                        name: 'Origin Show Partial Args',
                        use: 'picker.show(PromotionPicker.FC, {myVar: \'Imagine\'})',
                    }
                },
                {
                    id: 4,
                    onClickRow: () => {
                        picker.show(PromotionPicker, undefined);
                    },
                    field: {
                        name: 'Origin Show',
                        use: 'picker.show(PromotionPicker)',
                    }
                },
                {
                    id: 5,
                    onClickRow: () => {
                        picker.show(PromotionPickerArgs, {myVar: 'Imagine'});
                    },
                    field: {
                        name: 'Origin Show Args',
                        use: 'picker.show(PromotionPicker.FC, {myVar: \'Imagine\'})',
                    }
                },
                {
                    id: 6,
                    onClickRow: () => {
                        navigate({hash: '/control/editAccount/1'});
                    },
                    field: {
                        name: 'Hash Picker 1',
                        use: 'navigate({hash: \'/control/editAccount/1\'})',
                    }
                },
                {
                    id: 7,
                    onClickRow: () => {
                        navigate({hash: '/control/editAccount/2'});
                    },
                    field: {
                        name: 'Hash Picker 2',
                        use: 'navigate({hash: \'/control/editAccount/2\'})',
                    }
                },
                {
                    id: 8,
                    onClickRow: () => {
                        navigate({hash: '/control/editPassword'});
                    },
                    field: {
                        name: 'Hash Picker Diff',
                        use: 'navigate({hash: \'/control/editPassword\'})',
                    }
                },
                {
                    id: 9,
                    onClickRow: SliderRight.show,
                    field: {
                        name: 'Slider Right Show',
                        use: 'SliderRight.show',
                    }
                },
                {
                    id: 10,
                    onClickRow: SliderLeft.show,
                    field: {
                        name: ' Slider Left Show',
                        use: 'SliderLeft.show',
                    }
                },
                {
                    id: 11,
                    onClickRow: () => SliderUp.show(),
                    field: {
                        name: ' Slider Up Show',
                        use: 'SliderUp.show',
                    }
                },
            ]}
        />


        {/*<PromotionPicker.FC myVar="image"/>*/}
        {/*<PromotionBasePicker myVar="image"/>*/}
        {/*<BasePicker myVar="XXXXX"/>*/}
        {/*<CreateTaskPicker*/}
        {/*    onClose={() => setVisible(EVisible.none)}*/}
        {/*/>*/}

        {/*{isVisible &&*/}
        {/*    <CreateTaskPicker*/}
        {/*        onExitComplete={() => {*/}
        {/*            console.log('close');*/}
        {/*            setVisible(false);*/}
        {/*        }}*/}
        {/*    />*/}
        {/*}*/}



    </div>;
};

export default Example;




