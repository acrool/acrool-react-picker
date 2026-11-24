import CSS from 'csstype';


/**
 * 動畫曲線: 具名曲線，或貝茲曲線的四個數值
 */
export type TPickerEase = 'linear'|'easeIn'|'easeOut'|'easeInOut'|[number, number, number, number];

type TKeyframeValue = string|number;

/**
 * 一段動畫 (由 Web Animations API 播放)
 * keyframes: CSS 屬性對應的影格，單一值代表「由目前狀態到該值」，陣列代表完整影格
 * 位移、縮放請寫成 transform 字串，例如 {transform: ['translateY(100%)', 'translateY(0%)']}
 */
export interface IPickerAnimation {
    keyframes: Record<string, TKeyframeValue|TKeyframeValue[]>
    options?: {
        duration?: number,
        delay?: number,
        ease?: TPickerEase,
    }
}


export enum EVertical {
    bottom = 'bottom',
    top = 'top',
}
export enum EHorizontal {
    left = 'left',
    center = 'center',
    right = 'right',
}

export interface IPosition {
    vertical: EVertical
    horizontal: EHorizontal
}


/**
 * 選單內容的動畫設定
 * style: 不參與動畫的固定樣式 (例如定位)
 * enter: 進場動畫
 * exit: 離場動畫
 */
export interface IMotionOptions {
    enter?: IPickerAnimation
    exit?: IPickerAnimation
    className?: string
    style?: CSS.Properties
}


export interface IValueChange<T = string> {
    value?: T
    onChange?: (value: T) => void
}

export interface IPickerOption {
    isEnableHideSave?: boolean
    isEnableClickOutSiteHidden?: boolean
    isDisabledAutoPosition?: boolean
    isDisabledHideAutoFocus?: boolean
    isVisibleMask?: boolean
    isDebug?: boolean
    importantPosition?: IPosition
    motionProps?: IMotionOptions
}
