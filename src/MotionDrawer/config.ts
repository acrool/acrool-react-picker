import {IMotionOptions, IPickerAnimation} from '../types';


/**
 * 遮罩的動畫: 淡入、淡出
 */
export const maskMotion: Record<'enter'|'exit', IPickerAnimation> = {
    enter: {keyframes: {opacity: [0, 1]}, options: {duration: .3, ease: 'easeOut'}},
    exit: {keyframes: {opacity: 0}, options: {duration: .1, ease: 'easeOut'}},
};

/**
 * 選單 (自動定位) 的動畫: 淡入，離場時淡出並略為縮小
 */
export const pickerMotionProps: IMotionOptions = {
    style: {position: 'absolute', zIndex: 999},
    enter: {keyframes: {opacity: [.5, 1]}, options: {duration: .2, ease: 'easeOut'}},
    exit: {keyframes: {opacity: 0, transform: 'scale(.95)'}, options: {duration: .1, ease: 'easeOut'}},
};
