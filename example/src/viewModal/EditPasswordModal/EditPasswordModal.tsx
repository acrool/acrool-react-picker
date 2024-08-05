import {animation, createStatePicker, usePicker} from '@acrool/react-picker';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const EditPasswordPicker = createStatePicker(
    () => {
        const navigate = useNavigate();
        const pathname = useHashPathname();
        const {hide} = usePicker();

        return <>
            <p>hash pathname: {pathname}</p>

            <button type="button" onClick={async () => {
                await hide();
                navigate({hash: undefined});
            }}>X</button>
        </>;
    },
    {
        variants: animation.fadeInDown
    }
);

export default EditPasswordPicker;
