import CSS from 'csstype';
import {Ref} from 'react';

/**
 * 取得適合的顯示位置
 */
export const getVisiblePosition = (mainEl: HTMLDivElement|null, pickerHeight: number): CSS.Properties => {
    if(!mainEl){
        return {
            display: 'none',
        };
    }
    const mainRect = mainEl.getBoundingClientRect();

    const height = mainRect.height;
    const bottom = mainRect.bottom;
    const left = mainRect.left;
    // const right = mainRect.right;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;


    // const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;

    const vertical = bottom >= (screenHeight / 2)? 'top' : 'bottom';
    // const horizontal = right >= (screenWidth / 2) ? 'left' : 'right';


    return {
        top: vertical === 'bottom' ? `${bottom + scrollTop}px`: `${bottom + scrollTop - (pickerHeight + height)}px`,
        left: `${left + scrollLeft}px`,
        transformOrigin: vertical === 'bottom' ? 'top':'bottom',
    };

};


/**
* React.forwardRef(props, ref) => {
* const mainRef = useRef(null);
*
* return <textarea ref={setForwardedRef(ref, mainRef) />
*
* @param forwardedRef
* @param localRef
*/
export const setForwardedRef = <T>(
    forwardedRef: Ref<T>|undefined,
    localRef: React.MutableRefObject<T|null>
) => {
    return (node: T | null) => {
        localRef.current = node;
        if (forwardedRef) {
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                (forwardedRef as {current: T|null}).current = node as T|null;
            }
        }
    };
};
