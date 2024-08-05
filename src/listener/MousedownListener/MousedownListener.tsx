import {useEffect} from 'react';


interface MousedownListenerProps{
    onMousedown: (e: MouseEvent) => void
}
/**
 * 透過 mount unmount 註冊 Mousedown 事件
 * @param onMousedown
 * @constructor
 */
const MousedownListener = ({
    onMousedown
}: MousedownListenerProps) => {
    useEffect(() => {
        document.addEventListener('mousedown', onMousedown);
        return () => {
            document.removeEventListener('mousedown', onMousedown);
        };
    }, []);
    return null;
};

export default MousedownListener;
