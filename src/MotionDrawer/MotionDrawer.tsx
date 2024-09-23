import {motion} from 'framer-motion';
import {ForwardedRef, forwardRef, ReactNode, RefObject, useLayoutEffect, useRef,} from 'react';

import {usePicker} from '../PickerProvider';
import {EHorizontal, EVertical, IPickerOptions} from '../types';
import {setForwardedRef} from '../utils';
import styles from './motion-drawer.module.scss';


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
    anchorRef: RefObject<HTMLDivElement>
}


/**
 * Motion 動畫
 * @param pickerOptions
 * @param children
 * @param ref
 */
const MotionDrawer = ({
    children,
    anchorRef,
}: IProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    const Picker = usePicker();

    useLayoutEffect(() => {
        let vertical: EVertical = EVertical.bottom;
        let horizontal: EHorizontal = EHorizontal.left;
        const updatePosition = (entries) => {
            if(!Picker.isVisible){
                return;
            }

            if (anchorRef.current && pickerRef.current) {
                const pickerRect = entries?.[0]?.contentRect ?? pickerRef.current.getBoundingClientRect();
                const pickerHeight = pickerRect.height;
                const pickerWidth = pickerRect.width;

                const anchorRect = anchorRef.current.getBoundingClientRect();
                const height = anchorRect.height;
                const width = anchorRect.width;
                const bottom = anchorRect.bottom;
                const top = anchorRect.top;
                const left = anchorRect.left;
                const right = anchorRect.right;
                // const right = mainRect.right;

                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                const screenWidth = window.innerWidth || document.documentElement.clientWidth;
                const screenHeight = window.innerHeight || document.documentElement.clientHeight;

                const safePadding = 15;

                // 判斷垂直位置
                const isBottomSafeArea = (bottom + pickerHeight) < screenHeight; // 如果下面空間夠
                const isTopSafeArea = (top - (pickerHeight + safePadding)) > 0; // 如果下面空間夠

                if(vertical === EVertical.bottom){
                    if(!isBottomSafeArea && isTopSafeArea){
                        vertical = EVertical.top;
                    }
                }else if(vertical === EVertical.top){
                    if(isBottomSafeArea && !isTopSafeArea){
                        vertical = EVertical.bottom;
                    }else if(!isBottomSafeArea && !isTopSafeArea){
                        vertical = EVertical.bottom;
                    }
                }


                // 判斷水平位置
                const isLeftSafeArea = (left + pickerWidth) < screenWidth; // 如果下面空間夠
                const isRightSafeArea = (right - (pickerWidth + safePadding)) > 0; // 如果下面空間夠
                if(horizontal === EHorizontal.left){
                    if(!isLeftSafeArea && isRightSafeArea){
                        horizontal = EHorizontal.right;
                    }
                }else if(horizontal === EHorizontal.right){
                    if(isLeftSafeArea && !isRightSafeArea){
                        horizontal = EHorizontal.left;
                    }else if(!isLeftSafeArea && !isRightSafeArea){
                        horizontal = EHorizontal.left;
                    }
                }
                Picker.setVertical(vertical);

                pickerRef.current.style.top = vertical === EVertical.bottom ? `${bottom + scrollTop}px`: `${bottom + scrollTop - (pickerHeight + height)}px`;
                pickerRef.current.style.left = horizontal === EHorizontal.left ? `${left + scrollLeft}px`: `${right + scrollLeft - (pickerWidth)}px`;
                pickerRef.current.style.transformOrigin = vertical === EVertical.bottom ? 'top':'bottom';
                pickerRef.current.style.visibility = 'visible';

                // 循環
                window.requestAnimationFrame(updatePosition);
            }
        };

        if (anchorRef.current && pickerRef.current) {
            const resizeObserver = new ResizeObserver(updatePosition);
            resizeObserver.observe(pickerRef.current);

            // 避免移動該設定到上方統一 (https://github.com/acrool/acrool-react-picker/issues/1)
            // 監視 Observe之後再出現
            pickerRef.current.style.display = 'block';

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [Picker.isVisible, anchorRef, pickerRef]);



    return <>
        {/*{children}*/}
        <motion.div
            ref={setForwardedRef(ref, pickerRef)}
            transition={{type: 'spring', duration: .2}}
            style={{display: 'none', visibility: 'hidden'}}

            className={styles.motionAnimationWrapper}
            variants={defaultMotionProps.variants}
            initial="initial"
            animate="show"
            exit="exit"
        >
            {children}
        </motion.div>
    </>;

};

export default forwardRef(MotionDrawer);


