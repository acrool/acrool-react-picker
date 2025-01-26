import {Transition, Variant} from 'framer-motion';
import CSS from 'csstype';


type TVariantKey = 'initial'|'animate'|'exit'
export type TAnimationVariants = Record<TVariantKey, Variant>;


export enum EVertical {
    bottom = 'bottom',
    top = 'top',
}
export enum EHorizontal {
    left = 'left',
    right = 'right',
}

export interface IPosition {
    vertical: EVertical
    horizontal: EHorizontal
}


export interface IMotionOptions {
    variants?: TAnimationVariants
    transition?: Transition
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
    isDisabledAutoPosition?: boolean,
    isDisabledHideAutoFocus?: boolean,
    isVisibleMask?: boolean
    isDebug?: boolean
    importantPosition?: IPosition
    motionProps?: IMotionOptions
}
