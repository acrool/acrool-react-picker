import {animation, usePicker, createStatePicker} from '@acrool/react-picker';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const EditAccountPicker = createStatePicker(
    () => {
        const {id} = useHashParams<{id: string}>();
        const navigate = useNavigate();
        const pathname = useHashPathname();

        const {hide} = usePicker();

        return <>

            <p>hash pathname: {pathname}</p>
            <p>useHashParams id: {id}</p>
            <div className="d-flex  align-items-center justify-content-center gap-2">
                {/*<button type="button" onClick={() => navigate({hash: undefined})}>X</button>*/}
                <button type="button" onClick={() => {
                    hide()
                        .then(() => navigate({hash: undefined}));
                }}>X</button>
                <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>navigate HashPicker 1</button>
                <button type="button" onClick={() => navigate({hash: '/control/editAccount/2'})}>navigate HashPicker 2</button>
                <button type="button" onClick={() => navigate({hash: '/control/editPassword'})}>navigate DiffPicker</button>
                {/*<button type="button" onClick={PromotionPicker.show}>show portal picker</button>*/}
            </div>
        </>;
    }, {
        variants: animation.fadeInDown,
    }
);


export default EditAccountPicker;

