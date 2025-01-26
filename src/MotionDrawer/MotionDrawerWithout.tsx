import {motion} from 'framer-motion';
import React, {ForwardedRef, forwardRef, ReactNode, RefObject, useRef,} from 'react';

import {usePicker} from '../PickerProvider';
import {IMotionOptions, IPickerOption} from '../types';
import {setForwardedRef} from '../utils';
import {maskMotionProps} from './config';
import styles from './motion-drawer.module.scss';



interface IProps {
    pickerOptions?: IPickerOption,
    children: ReactNode
    isDebug?: boolean
    onKeyDown?: (e: React.KeyboardEvent) => void
    isVisibleMask?: boolean,
    motionProps?: IMotionOptions,
}


/**
 * Motion 動畫
 * @param isDebug
 * @param anchorRef
 * @param onKeyDown
 * @param isVisibleMask
 * @param children
 * @param ref
 */
const MotionDrawerWithout = ({
    children,
    isDebug = false,
    onKeyDown,
    isVisibleMask,
    motionProps,
}: IProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const pickerRef = useRef<HTMLDivElement>(null);

    return <>
        {isVisibleMask &&
            <motion.div
                key="mask"
                className={styles.motionMaskWrapper}
                initial="initial"
                animate="animate"
                exit="exit"
                {...maskMotionProps}
            />
        }

        <motion.div
            key="main"
            ref={setForwardedRef(ref, pickerRef)}
            className={styles.motionAnimationWrapper}
            onKeyDown={onKeyDown}
            data-debug={isDebug ? '': undefined}
            {...motionProps}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    </>;

};

export default forwardRef(MotionDrawerWithout);


