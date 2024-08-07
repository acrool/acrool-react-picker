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
- Quickly create light box effects and send them to the outside to avoid hierarchical problems


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
  title?: string
  name?: string
  value?: number
  options?: number[]
  disabled?: boolean
  onChange?: (value: number) => void
  placeholder?: string
}



/**
 * 數字選擇器(含數字鍵盤)
 *
 * @param style
 * @param className
 * @param title 標題
 * @param disabled 是否禁用
 * @param ref
 */
const SelectNumberKeyboard = ({
    id,
    placeholder = '0',
}: IProps, ref?: ForwardedRef<HTMLButtonElement>) => {
  const Picker = usePicker();

  /**
   * 清除
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

- Here are two ways to use it
  - [A. Custom picker component](#a-custom-picker-component)
  - [B. Custom state picker component](#b-custom-state-picker-component)


## A. Custom picker component

Add the lightbox to the display column list by throwing the Show method

***Defined Picker***

```tsx
import {animation, createPicker, IPickerOptions, usePicker} from '@acrool/react-picker';

const pickerProps: IPickerOptions = {
    variants: animation.fadeInDown,
    className: 'p-3'
};

interface IProps {
    myVar: string
}

const PromotionPicker = createPicker(
    (args: IProps) => {
        const {hide} = usePicker();

        return <div>
            <div>Test2 content</div>
            <button type="button" onClick={hide}>X </button>
        </div>;
    }
    , pickerProps
);

export default PromotionPicker;
```

***Use Picker***

then in your page

```tsx
const ExamplePage = () => {
    return <div>
        <button type="button" onClick={() => PromotionPicker.show({myVar: 'Imageine'})}>Show Picker</button>
    </div>
}
```









## B. Custom state picker component

The inside of the light box is controlled by its own state, which is displayed through rendering, such as using HashRouter.

***Defined Picker***

```tsx
import {animation, createStatePicker, IPickerOptions, usePicker} from '@acrool/react-picker';
import {useHashParams} from '@acrool/react-router-hash';

const pickerProps: IPickerOptions = {
    variants: animation.fadeInDown,
    className: 'p-3'
};

interface IProps {
    myVar: string
}

const PromotionHashPicker = createStatePicker(
    () => {
        const {hide} = usePicker();
        const navigate = useNavigate();
        const {id} = useHashParams<{id: string}>();
        
        const handleOnClose = () => {
            hide().then(() => {
                navigate({hash: undefined});
            })
        }

        return <div>
            <div>Test2 content</div>
            <button type="button" onClick={handleOnClose}>Close Picker</button>
        </div>;
    }
    , pickerProps
);

export default PromotionHashPicker;
```


***Defined Hash Route***

> It should be noted that it must be within the scope of `Router Provider`. Another way is to place it in `Layout` and `Outlet` middle layer.

```tsx
import {HashRoute,HashRoutes} from '@acrool/react-router-hash';
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

const history = createBrowserHistory({window});

const RouterSetting = () => {
    return <Router>

        <Routes>
            <Route path="/" element={<Example/>} />
        </Routes>

        <HashRoutes>
            <HashRoute path="promotion/:id" element={<PromotionHashPicker/>}/>
        </HashRoutes>

        {/* Add this */}
        <PickerPortal/>

    </Router>;
};
```



***Use Picker***

then in your page

```tsx
import {useNavigate} from 'react-router-dom';

const ExamplePage = () => {
    const navigate = useNavigate();
    return <div>
        <button type="button" onClick={() => navigate({hash: '/promotion/1'})}>Show Picker</button>
        <button type="button" onClick={() => navigate({hash: '/promotion/2'})}>Show Picker</button>
    </div>
}
```



- animation
  - fadeInDown: (default), ex Base picker style
  - zoomInDown
  - slideInLeft: ex Drawer slider
  - slideInRight: ex Drawer slider
  - slideInUp: ex Dropdown
  - custom (ref; https://www.framer.com/motion/animate-presence/#usage)
   ```tsx
  variants = {
    initial: {opacity: 0, y: -20, transition: {type:'spring'}},
    show: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -40}
  }
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

