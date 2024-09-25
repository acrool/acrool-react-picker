import {Transition, Variant} from 'framer-motion';


type TVariantKey = 'initial'|'show'|'exit'
export type TAnimationVariants = Record<TVariantKey, Variant>;


export enum EVertical {
    bottom = 'bottom',
    top = 'top',
}
export enum EHorizontal {
    left = 'left',
    right = 'right',
}


export interface IPickerOptions {
    variants?: TAnimationVariants
    transition?: Transition
    className?: string
    isEnableHideWithClickMask?: boolean
}


export interface IValueChange<T = string> {
    value?: T
    onChange?: (value: T) => void
}

export interface IPickerOption {
    isEnableHideSave?: boolean
    isEnableClickOutSiteHidden?: boolean
}


export enum EKeyboardKey {
    Escape = 'Escape',
    Enter = 'Enter',
    Space = 'Space',
    Tab = 'Tab',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
}
