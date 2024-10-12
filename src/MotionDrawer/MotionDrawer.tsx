import {motion} from 'framer-motion';
import React, {ForwardedRef, forwardRef, ReactNode, RefObject, useCallback, useEffect, useRef,} from 'react';

import {usePicker} from '../PickerProvider';
import {IPickerOptions} from '../types';
import {setForwardedRef} from '../utils';
import styles from './motion-drawer.module.scss';
import {getScrollParent, updatePosition} from './utils';


const defaultMotionProps: IPickerOptions = {
    variants: {
        initial: {position: 'absolute', zIndex: 999, opacity: 0, transition: {type:'spring'}},
        show: {opacity: 1,  transition: {type: 'just'}},
        exit: {opacity: 0, scale: .95},
    },
    transition: {
        duration: .1,
        opacity: {
            duration: .3,
        },
        scale: {
            duration: .05,
        }
    }
};




interface IProps {
    children: ReactNode
    isDebug?: boolean
    anchorRef: RefObject<HTMLDivElement>
    onKeyDown?: (e: React.KeyboardEvent) => void
}


/**
 * Motion 動畫
 * @param pickerOptions
 * @param children
 * @param ref
 */
const MotionDrawer = ({
    children,
    isDebug = false,
    anchorRef,
    onKeyDown,
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

    }, []);


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



    return  <motion.div
        ref={setForwardedRef(ref, pickerRef)}
        transition={{type: 'spring', duration: .2}}
        style={{display: 'none'}}

        className={styles.motionAnimationWrapper}
        data-debug={isDebug ? '': undefined}
        variants={defaultMotionProps.variants}
        initial="initial"
        animate="show"
        exit="exit"
        tabIndex={0}
        onKeyDown={onKeyDown}
    >
        {children}
    </motion.div>;

};

export default forwardRef(MotionDrawer);


