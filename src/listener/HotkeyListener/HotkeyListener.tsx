import {useEffect} from 'react';


interface HotkeyListenerProps{
    onKeydown: (e: KeyboardEvent) => void
}

/**
 * 透過 mount unmount 註冊 keydown 事件
 * @param onKeydown
 * @constructor
 */
const HotkeyListener = ({
    onKeydown
}: HotkeyListenerProps) => {
    useEffect(() => {
        document.addEventListener('keydown', onKeydown);
        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, []);
    return null;
};

export default HotkeyListener;
