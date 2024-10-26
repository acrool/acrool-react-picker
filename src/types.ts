import {Transition, Variant} from 'framer-motion';


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
}


export interface IValueChange<T = string> {
    value?: T
    onChange?: (value: T) => void
}

export interface IPickerOption {
    isEnableHideSave?: boolean
    isEnableClickOutSiteHidden?: boolean
    isVisibleMask?: boolean
    isDebug?: boolean
    importantPosition?: IPosition
}
