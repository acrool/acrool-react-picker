import {motion} from 'framer-motion';
import {
    ForwardedRef,
    forwardRef,
    ReactNode,
    RefObject,
    useEffect,
    useRef,
} from 'react';

import {IPickerOptions} from '../types';
import {setForwardedRef} from '../utils';
import styles from './motion-drawer.module.scss';


const defaultMotionProps: IPickerOptions = {
    variants: {
        initial: {position: 'absolute', zIndex: 999, opacity: 0, scale: .95, transition: {type:'spring'}},
        show: {opacity: 1, scale: 1, transition: {type: 'just'}},
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

    useEffect(() => {
        const updatePosition = (entries) => {
            if (anchorRef.current && pickerRef.current) {
                const pickerRect = entries?.[0]?.contentRect ?? pickerRef.current.getBoundingClientRect();
                const pickerHeight = pickerRect.height;

                const anchorRect = anchorRef.current.getBoundingClientRect();
                const height = anchorRect.height;
                const bottom = anchorRect.bottom;
                const left = anchorRect.left;
                // const right = mainRect.right;

                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                // const screenWidth = window.innerWidth || document.documentElement.clientWidth;
                const screenHeight = window.innerHeight || document.documentElement.clientHeight;

                const safePadding = 15;
                const vertical = (bottom + pickerHeight + safePadding) >= screenHeight ? 'top' : 'bottom';


                pickerRef.current.style.top = vertical === 'bottom' ? `${bottom + scrollTop}px`: `${bottom + scrollTop - (pickerHeight + height)}px`;
                pickerRef.current.style.left = `${left + scrollLeft}px`;
                pickerRef.current.style.transformOrigin = vertical === 'bottom' ? 'top':'bottom';

                // 循環
                requestAnimationFrame(updatePosition);
            }
        };

        if (anchorRef.current && pickerRef.current) {
            pickerRef.current.style.display = 'block';

            const resizeObserver = new ResizeObserver(updatePosition);
            resizeObserver.observe(pickerRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [anchorRef, pickerRef]);




    return <motion.div
        ref={setForwardedRef(ref, pickerRef)}
        transition={{type: 'spring', duration: .2}}
        style={{display: 'none'}}

        className={styles.motionAnimationWrapper}
        variants={defaultMotionProps.variants}
        initial="initial"
        animate="show"
        exit="exit"
    >
        {children}
    </motion.div>;
};

export default forwardRef(MotionDrawer);


