import CSS from 'csstype';
import {Ref} from 'react';



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
