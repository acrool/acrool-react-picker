import {useEffect} from 'react';

interface DropdownCloseListenerProps{
    onPickerHide: () => void
}
/**
 * 透過 mount unmount 註冊 Mousedown 事件
 * @param onMousedown
 * @constructor
 */
const PickerHideListener = ({
    onPickerHide
}: DropdownCloseListenerProps) => {
    useEffect(() => {
        return () => {
            onPickerHide();
        };
    }, []);
    return null;
};

export default PickerHideListener;
