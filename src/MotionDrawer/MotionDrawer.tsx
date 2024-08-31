import {motion} from 'framer-motion';
import {ForwardedRef, forwardRef, ReactNode, RefObject, useEffect, useRef, useState} from 'react';

import {IPickerOptions} from '../types';
import {getVisiblePosition, setForwardedRef} from '../utils';
import styles from './motion-drawer.module.scss';


const defaultMotionProps: IPickerOptions = {
    variants: {
        initial: {position: 'absolute', zIndex: 999, opacity: 0, scale: .9, transition: {type:'spring'}},
        show: {opacity: 1, scale: 1, transition: {type: 'just'}},
        exit: {opacity: 0, scale: .9},
    },
    transition: {
        duration: .1,
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
    const [pickerHeight, setPickerHeight] = useState(0);

    useEffect(() => {
        if (pickerRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                // We only have one entry, so we can use entries[0].
                const observedHeight = entries[0].contentRect.height;
                setPickerHeight(observedHeight);
            });

            resizeObserver.observe(pickerRef.current);

            return () => {
                // Cleanup the observer when the component is unmounted
                resizeObserver.disconnect();
            };
        }
    }, []);
    


    const style = getVisiblePosition(anchorRef.current, pickerHeight);

    return <motion.div
        ref={setForwardedRef(ref, pickerRef)}
        transition={{type: 'spring', duration: .2}}
        style={style}
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


