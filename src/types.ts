import {Transition, Variant} from 'framer-motion';


type TVariantKey = 'initial'|'show'|'exit'
export type TAnimationVariants = Record<TVariantKey, Variant>;


export enum EVertical {
    bottom = 'bottom',
    top = 'top',
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



export enum EKeyboardKey {
    Escape = 'Escape',
    Enter = 'Enter',
    Tab = 'Tab',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
}
