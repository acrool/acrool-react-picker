import {IPosition} from '@/library/acrool-react-picker/types';

/**
 * 取得適合的顯示位置
 */
export const getVisiblePosition = (el: HTMLDivElement|null): IPosition => {
    if(!el){
        return {
            vertical: 'bottom',
            horizontal: 'left',
        };
    }
    const rect = el.getBoundingClientRect();
    const bottom = rect.bottom;
    const right = rect.right;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;

    const vertical = bottom >= (screenHeight / 2)? 'top' : 'bottom';
    const horizontal = right >= (screenWidth / 2) ? 'left' : 'right';
    return {
        vertical,
        horizontal
    };
};
