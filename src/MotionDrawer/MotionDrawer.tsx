import {motion} from 'framer-motion';
import {ForwardedRef, forwardRef, ReactNode} from 'react';

import {IPickerOptions, IPosition} from '../types';
import styles from './motion-drawer.module.scss';


const defaultMotionProps: IPickerOptions = {
    variants: {
        initial: {position: 'absolute', zIndex: 999, opacity: 0, transition: {type:'spring'}},
        show: {opacity: 1, transition: {type: 'just'}},
        exit: {opacity: 0},
    },
    transition: {
        duration: .1,
    }
};




interface IProps {
    position: IPosition
    children: ReactNode
}


/**
 * Motion 動畫
 * @param pickerOptions
 * @param position
 * @param children
 * @param ref
 */
const MotionDrawer = ({
    position,
    children,
}: IProps, ref?: ForwardedRef<HTMLDivElement>) => {


    const css = {
        bottom: position.vertical === 'top' ? 'calc(100% - 1px)': undefined,
        top: position.vertical === 'bottom' ? 'calc(100% - 1px)': undefined,
        // left: position.horizontal === 'right' ? 'calc(100% - 1px)': undefined,
        // right: position.horizontal === 'left' ? 'calc(100% - 1px)': undefined,
    };

    return <motion.div
        ref={ref}
        transition={{type: 'spring', duration: .2}}
        style={css}
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


