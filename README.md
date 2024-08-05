# Acrool React Picker

<a href="https://acrool-react-picker.pages.dev/" title="Acrool React Picker - This is a picker function for React development loading picker">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-picker/main/example/public/og.webp" alt="Acrool React Picker Logo"/>
</a>

<p align="center">
    This is a toast message function for React development notifications
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-picker)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-picker?style=for-the-badge)](https://github.com/acrool/@acrool/react-picker/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-picker?style=for-the-badge)](https://github.com/acrool/react-picker/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-picker)
[![npm](https://img.shields.io/npm/dt/@acrool/react-picker.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-picker)

</div>





## Features

- Supports queue picker list
- Plug and unplug using `@acrool/react-portal` and `framer-motion`
- Quickly create light box effects and send them to the outside to avoid hierarchical problems
- Support [@acrool/react-router-hash](https://github.com/acrool/acrool-react-router-hash) lightbox (using createControlledPicker)

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

> It should be noted that it must be within the scope of `Router Provider`. Another way is to place it in `Layout` and `Outlet` middle layer.


```tsx
import {PickerPortal} from "@acrool/react-picker";

const App = () => {
    return (
        <div>
            <BaseUsed/>
            <PickerPortal/>
        </div>
    );
};
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


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)


## Refer to

- [https://github.com/ebay/nice-picker-react](https://github.com/ebay/nice-picker-react)
- [https://animate.style](https://animate.style)
