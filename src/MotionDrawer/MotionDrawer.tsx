import {motion} from 'framer-motion';
import React, {ForwardedRef, forwardRef, ReactNode, RefObject, useCallback, useEffect, useRef,} from 'react';

import {usePicker} from '../PickerProvider';
import {setForwardedRef} from '../utils';
import {maskMotionProps, pickerMotionProps} from './config';
import styles from './motion-drawer.module.scss';
import {getScrollParent, updatePosition} from './utils';



interface IProps {
    children: ReactNode
    isDebug?: boolean
    anchorRef: RefObject<HTMLDivElement>
    onKeyDown?: (e: React.KeyboardEvent) => void
    isVisibleMask?: boolean,
}


/**
 * Motion 動畫
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
    const Picker = usePicker();

    const handleUpdatePosition = useCallback(() => {
        updatePosition(
            anchorRef,
            pickerRef,
            Picker.setVertical,
            Picker.importantPosition,
        );

    }, [Picker.setVertical, Picker.importantPosition]);


    useEffect(() => {

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
            <motion.div
                className={styles.motionMaskWrapper}
                initial="initial"
                animate="animate"
                exit="exit"
                {...maskMotionProps}
            />
        }
        <motion.div
            ref={setForwardedRef(ref, pickerRef)}
            style={{display: 'none'}}
            className={styles.motionAnimationWrapper}
            
            initial="initial"
            animate="animate"
            exit="exit"
            tabIndex={0}

            {...pickerMotionProps}
            onKeyDown={onKeyDown}
            data-debug={isDebug ? '': undefined}
        >
            {children}
        </motion.div>
    </>;

};

export default forwardRef(MotionDrawer);


