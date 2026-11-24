import React, {ForwardedRef, forwardRef, ReactNode, RefObject, useCallback, useEffect, useRef,} from 'react';

import {usePicker} from '../PickerProvider';
import {setForwardedRef} from '../utils';
import {pickerMotionProps} from './config';
import styles from './motion-drawer.module.scss';
import usePresenceMotion from './usePresenceMotion';
import {getScrollParent, updatePosition} from './utils';



interface IProps {
    children: ReactNode
    isDebug?: boolean
    anchorRef: RefObject<HTMLDivElement|null>
    onKeyDown?: (e: React.KeyboardEvent) => void
    isVisibleMask?: boolean
}


/**
 * Motion 動畫 (自動定位在錨點旁)
 *
 * 需放在 AnimatePresence 內：離場動畫播完才會移除節點
 * @param isDebug
 * @param anchorRef
 * @param onKeyDown
 * @param pickerOptions
 * @param children
 * @param ref
 */
const MotionDrawer = ({
    children,
    isDebug = false,
    anchorRef,
    onKeyDown,
    isVisibleMask,
}: IProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const Picker = usePicker();

    usePresenceMotion({maskRef, mainRef: pickerRef, motionProps: pickerMotionProps});

    const handleUpdatePosition = useCallback(() => {
        updatePosition(
            anchorRef,
            pickerRef,
            Picker.setVertical,
            Picker.importantPosition,
        );

    }, [Picker.setVertical, Picker.importantPosition]);


    useEffect(() => {

        if(!Picker.isVisible){
            return;
        }
        if (anchorRef.current && pickerRef.current) {
            const scrollParent = getScrollParent(anchorRef.current);

            if(scrollParent){
                scrollParent.addEventListener('scroll', handleUpdatePosition);
                window.addEventListener('resize', handleUpdatePosition);
            }
            // 避免移動該設定到上方統一 (https://github.com/acrool/acrool-react-picker/issues/1)
            // 監視 Observe之後再出現
            window.requestAnimationFrame(() => {
                if (pickerRef.current) {
                    pickerRef.current.style.display = 'flex';
                    handleUpdatePosition();
                }
            });


            return () => {
                if(scrollParent) {
                    scrollParent.removeEventListener('scroll', handleUpdatePosition);
                    window.removeEventListener('resize', handleUpdatePosition);
                }

            };
        }
    }, [Picker.isVisible]);



    return <>
        {isVisibleMask &&
            <div
                key="mask"
                ref={maskRef}
                className={styles.motionMaskWrapper}
            />
        }

        <div
            key="main"
            ref={setForwardedRef(ref, pickerRef)}
            style={{...pickerMotionProps.style, display: 'none'}}
            className={styles.motionAnimationWrapper}
            tabIndex={0}
            onKeyDown={onKeyDown}
            data-debug={isDebug ? '': undefined}
        >
            {children}
        </div>
    </>;

};

export default forwardRef(MotionDrawer);


