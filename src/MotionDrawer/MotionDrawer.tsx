import React, {ForwardedRef, forwardRef, ReactNode, RefObject, useCallback, useEffect, useLayoutEffect, useRef,} from 'react';

import {usePicker} from '../PickerProvider';
import {setForwardedRef} from '../utils';
import {pickerMotionProps} from './config';
import styles from './motion-drawer.module.scss';
import usePresenceMotion from './usePresenceMotion';
import {getScrollParent, updatePosition} from './utils';



/**
 * 在 client 用 useLayoutEffect（繪製前執行），SSR 退回 useEffect 以免警告
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;


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


    // 顯示並定位要在瀏覽器繪製前完成：進場動畫在 layout effect 就開始計時 (usePresenceMotion)，
    // 晚幾格才顯示的話，看到的已經是動畫的後段，選單會像「慢半拍才跳出來」(手機上特別明顯)。
    // portal 的容器在子層的 layout effect 之後才掛上 document，這時量不到位置，所以延到 microtask：
    // 容器已經在畫面上，而且仍在繪製前。顯示與定位同時進行，不會先在錯誤的位置閃一下 (#1、#7)
    useIsomorphicLayoutEffect(() => {
        if(!Picker.isVisible){
            return;
        }

        let isCancelled = false;
        Promise.resolve().then(() => {
            if(isCancelled || !pickerRef.current) return;
            pickerRef.current.style.display = 'flex';
            handleUpdatePosition();
        });

        return () => {
            isCancelled = true;
        };
    }, [Picker.isVisible]);


    // 捲動、改變視窗大小時重新定位
    useEffect(() => {
        if(!Picker.isVisible || !anchorRef.current){
            return;
        }

        const scrollParent = getScrollParent(anchorRef.current);
        scrollParent.addEventListener('scroll', handleUpdatePosition);
        window.addEventListener('resize', handleUpdatePosition);

        return () => {
            scrollParent.removeEventListener('scroll', handleUpdatePosition);
            window.removeEventListener('resize', handleUpdatePosition);
        };
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


