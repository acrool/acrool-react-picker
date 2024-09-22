# Acrool React Picker

<a href="https://acrool-react-picker.pages.dev/" title="Acrool React Picker - This is a react method to quickly combine buttons with Picker">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-picker/main/example/public/og.webp" alt="Acrool React Picker Logo"/>
</a>

<p align="center">
    This is a react method to quickly combine buttons with Picker
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-picker)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-picker?style=for-the-badge)](https://github.com/acrool/@acrool/react-picker/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-picker?style=for-the-badge)](https://github.com/acrool/react-picker/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-picker)
[![npm](https://img.shields.io/npm/dt/@acrool/react-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-picker)

</div>





## Features

- Quickly create various Pickers such as Datepicker, timepicker, Select dropdown, etc.
- Plug and unplug using `framer-motion`
- Simulate the browser's native drop-down menu behavior (click outside to close, lose focus to close, open the menu when the keyboard is pressed or blank)
- The agent menu OnChange and value changes can be controlled freely and will be saved when the menu is closed.


## Install

```bash
yarn add @acrool/react-picker
```

## Usage

add in your index.tsx
```tst
import "@acrool/react-picker/dist/index.css";
```

add in your App.tsx


```tsx
import {isEmpty} from '@acrool/js-utils/equal';
import clsx from 'clsx';
import React, {ForwardedRef} from 'react';
import styled, {css} from 'styled-components';

import NumberKeyboard from './NumberKeyboard';
import {createPicker, usePicker} from '@acrool/react-picker';




interface IProps extends FCProps {
  value?: number
  options?: number[]
  onChange?: (value: number) => void
  placeholder?: string
}



/**
 * Select Number Keyboard
 */
const SelectNumberKeyboard = ({
    id,
    placeholder = '0',
}: IProps, ref?: ForwardedRef<HTMLButtonElement>) => {
  const Picker = usePicker();

  /**
   * Clean
   */
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    Picker.onChange(0);
  };

  const isPlaceholderValue = isEmpty(Picker.value);

  return <SelectNumberKeyboardRoot
          ref={ref}
          type="button"
          onMouseDown={Picker.toggle}
          isFocus={Picker.isInputFocus}
          onFocus={Picker.inputFocus}
    >
      <Text isPlaceholderValue={isPlaceholderValue}>
        {isPlaceholderValue ? placeholder: Picker.value}
      </Text>
  </SelectNumberKeyboardRoot>;
};


const Picker = (props: IProps) => {
  const Picker = usePicker();

  const handleClickPicker = (addNumber: number) => {
    let result = 0;
    const currValue = Picker.value ?? 0;
    if(addNumber >= 0){
      result = currValue + addNumber;
    }
    Picker.onChange(result);
  };

  return <NumberKeyboard
          data={props.options}
          onChange={handleClickPicker}
  />;
};

export default createPicker(
        SelectNumberKeyboard,
        Picker
);


const SelectNumberKeyboardRoot = styled.button<{
  isFocus?: boolean,
}>`
    transition: box-shadow .15s ease-in-out;

    ${props => props.isFocus && css`
        box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    `}

`;
```


## If you need to automatically infer types

```tsx

export default createPicker(
        SelectNumberKeyboard,
        Picker
) as <V extends any>(props: IProps<V>) => JSX.Element;
```


## If you need to not hide trigger onChange

```tsx

export default createPicker(
        SelectNumberKeyboard,
        Picker,
    {
        isEnableHideSave: false,
        isEnableClickOutSiteHidden: false
    }
) as <V extends any>(props: IProps<V>) => JSX.Element;
```


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-picker/main/play-in-example-button.svg)](https://acrool-react-picker.pages.dev)


## Precautions

- The main control controls the opening and closing of the menu. You need to use `onMousedown` instead of `onClick`.
- The main control needs to use button to have the Tab focus function, where `react-hook-form` is very useful
- The main control needs to use button. If you want to add a clear button in the inner layer, remember that it cannot be button, because `button > button` is an html structure error, and you need to use `onMousedown` instead of `onClick`.


## Ref warning

`Warning: forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?`

```tsx
interface IProps {
  value: string, 
  onChange:(value: string) => void
}
const DateTimeField = (props: IProps) => {}

// fix to 
const DateTimeFieldAfter = (props: IProps, ref?: ForwardedRef<HTMLElement>) => {}
```


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)

