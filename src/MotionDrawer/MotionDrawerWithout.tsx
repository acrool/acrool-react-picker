import {clsx} from 'clsx';
import React, {ForwardedRef, forwardRef, ReactNode, RefObject, useRef,} from 'react';

import {IMotionOptions, IPickerOption} from '../types';
import {setForwardedRef} from '../utils';
import styles from './motion-drawer.module.scss';
import usePresenceMotion from './usePresenceMotion';



interface IProps {
    pickerOptions?: IPickerOption
    children: ReactNode
    isDebug?: boolean
    onKeyDown?: (e: React.KeyboardEvent) => void
    isVisibleMask?: boolean
    motionProps?: IMotionOptions
}


/**
 * Motion 動畫 (不自動定位，位置與動畫由 motionProps 決定)
 *
 * 需放在 AnimatePresence 內：離場動畫播完才會移除節點
 * @param isDebug
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
    const maskRef = useRef<HTMLDivElement>(null);

    usePresenceMotion({maskRef, mainRef: pickerRef, motionProps});

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
            className={clsx(styles.motionAnimationWrapper, motionProps?.className)}
            style={motionProps?.style}
            onKeyDown={onKeyDown}
            data-debug={isDebug ? '': undefined}
        >
            {children}
        </div>
    </>;

};

export default forwardRef(MotionDrawerWithout);


