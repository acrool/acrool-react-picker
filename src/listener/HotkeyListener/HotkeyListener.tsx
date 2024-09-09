import {useEffect} from 'react';


interface HotkeyListenerProps{
    onKeyDown: (e: KeyboardEvent) => void
}

/**
 * 透過 mount unmount 註冊 keydown 事件
 * @param onKeydown
 * @constructor
 */
const HotkeyListener = ({
    onKeyDown
}: HotkeyListenerProps) => {
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);
    return null;
};

export default HotkeyListener;
