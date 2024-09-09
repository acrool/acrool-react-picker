import {useEffect} from 'react';


interface HotkeyListenerProps{
    onKeyUp: (e: KeyboardEvent) => void
}

/**
 * 透過 mount unmount 註冊 keydown 事件
 * @param onKeydown
 * @constructor
 */
const HotkeyListener = ({
    onKeyUp
}: HotkeyListenerProps) => {
    useEffect(() => {
        document.addEventListener('keyup', onKeyUp);
        return () => {
            document.removeEventListener('keyup', onKeyUp);
        };
    }, []);
    return null;
};

export default HotkeyListener;
