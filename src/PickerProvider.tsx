import Logger from '@acrool/js-logger';
import React, {createContext, useContext} from 'react';


interface IContextProps<T = any> {
    hide: () => void
    show: () => void
    toggle: () => void
    isVisible: boolean

    inputFocus: () => void
    inputBlur: () => void
    isInputFocus: boolean

    value?: T
    onChange: (value: T) => void
}

export const PickerProviderContext = createContext<IContextProps>({
    hide: () => Logger.warning('No hide method detected, did you embed your app with Acrool/PickerPortal?'),
    show: () => Logger.warning('No show method detected, did you embed your app with Acrool/PickerPortal?'),
    toggle: () => Logger.warning('No toggle method detected, did you embed your app with Acrool/PickerPortal?'),
    isVisible: false,


    inputFocus: () => Logger.warning('No focus method detected, did you embed your app with Acrool/PickerPortal?'),
    inputBlur: () => Logger.warning('No blur method detected, did you embed your app with Acrool/PickerPortal?'),
    isInputFocus: false,

    onChange: () => Logger.warning('No onChange method detected, did you embed your app with Acrool/PickerPortal?'),
});

export const PickerProviderConsumer = PickerProviderContext.Consumer;

export const usePicker = () => useContext(PickerProviderContext);
