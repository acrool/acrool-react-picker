import {Transition, Variant} from 'framer-motion';


type TVariantKey = 'initial'|'show'|'exit'
export type TAnimationVariants = Record<TVariantKey, Variant>;


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

export interface IPosition {vertical: 'top'|'bottom', horizontal: 'left'|'right'}


export enum EKeyboardKey {
    Escape = 'Escape',
    Enter = 'Enter',
    Tab = 'Tab',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowDown',
}
