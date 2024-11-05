import {IMotionOptions} from '../types';


export const maskMotionProps: IMotionOptions = {
    variants: {
        initial: {opacity: 0, transition: {type:'spring'}},
        animate: {opacity: 1, transition: {type: 'just'}},
        exit: {opacity: 0},
    },
    transition: {
        duration: .3,
    }
};

export const pickerMotionProps: IMotionOptions = {
    variants: {
        initial: {position: 'absolute', zIndex: 999, opacity: .5},
        animate: {opacity: 1},
        exit: {opacity: .6, scale: .95, transition: {type: 'just', duration: .1}},
    },
    transition: {
        type: 'just',
        duration: .2,
    }
};
