import Logger from '@acrool/js-logger';
import {AnimatePresence} from 'framer-motion';
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';

import HotkeyListener from '../listener/HotkeyListener';
import MousedownListener from '../listener/MousedownListener';
import PickerHideListener from '../listener/PickerHideListener';
import styles from '../modal.module.scss';
import MotionDrawer from '../MotionDrawer';
import {PickerProviderContext} from '../PickerProvider';
import {EKeyboardKey, IValueChange} from '../types';
import {getVisiblePosition} from '../utils';



/**
 * 產生帶 framer-motion 功能的Picker
 *
 * 需要呼叫 show 才會傳送到 portal
 * @param MainComponent
 * @param DropdownComponent
 */
function createPicker<V extends {}, P>(MainComponent: React.FC<P & IValueChange<V>>, DropdownComponent: React.FC<P & IValueChange<V>>) {

    const RefMainComponent = forwardRef(MainComponent as React.ForwardRefRenderFunction<P & IValueChange<V>>) as React.ForwardRefExoticComponent<React.RefAttributes<P & IValueChange<V>>>;

    /**
     * Add framer motion
     * @param args
     * @param ref
     */
    const MotionPicker = (args, ref?: React.Ref<P & IValueChange<V>>) => {
        const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
        const [isInputFocus, setInputFocus] = useState<boolean>(false);


        const [value, setValue] = useState<V>();
        const pickerRef = useRef<HTMLDivElement>(null);
        const mainRef = useRef<HTMLDivElement>(null);
        const runTimeValueRef = useRef<V|undefined>(value);


        useEffect(() => {
            // 同步 Props value 異動
            setValue(args.value);

        }, [JSON.stringify(args.value)]);


        useEffect(() => {
            // 同步 value (為了讓 event listener 可以拿到)
            runTimeValueRef.current = value;
        }, [value]);


        /**
         * 處理當鍵盤按 Tab 的時候關閉選單與注視
         * @
         */
        const handleOnBlurHotKey = useCallback((evt: KeyboardEvent) => {
            if([EKeyboardKey.Tab].includes(evt.key as EKeyboardKey)) {
                setPickerVisible(false);
                setInputFocus(false);
            }
        }, []);


        /**
         * 處理當鍵盤按[上 下 空白]的時候開啟選單
         * @
         */
        const handleOnShowHotKey = useCallback((evt: KeyboardEvent) => {
            if([EKeyboardKey.ArrowUp, EKeyboardKey.ArrowDown, EKeyboardKey.Enter].includes(evt.key as EKeyboardKey) || evt.code === 'Space') {
                setPickerVisible(true);
            }
        }, []);

        /**
         * 模擬選單是已關閉狀態 但 還在 Focus狀態，關閉 Focus 狀態
         * @
         */
        const handleBlurCheck = useCallback((evt: MouseEvent) => {
            if(!pickerRef.current &&
                mainRef.current && !mainRef.current.contains(evt.target as Node)
            ){
                setInputFocus(false);
            }
        }, []);


        /**
         * 模擬下拉選單 "點擊區域外"，將下拉選單關閉
         * @
         */
        const handleClickOutSite = useCallback((evt: MouseEvent) => {
            if(pickerRef.current && !pickerRef.current.contains(evt.target as Node) &&
                mainRef.current && !mainRef.current.contains(evt.target as Node)
            ){
                setPickerVisible(false);
                setInputFocus(false);
            }
        }, []);


        /**
         * 當視窗關閉時觸發onChange
         */
        const onPickerHide = useCallback(() => {
            if(typeof args?.onChange === 'undefined'){
                Logger.warning('@acrool/react-picker', 'createPicker component props onChange is undefined, is no call');
                return;
            }
            if(typeof runTimeValueRef.current !== 'undefined'){
                const isDiff = JSON.stringify(value) !== JSON.stringify(runTimeValueRef.current);
                if(isDiff){
                    args.onChange(runTimeValueRef.current);
                }
            }
        }, [value, args.onChange]);


        /**
         * 禁止KeyBoard
         */
        const disabledKeydown = useCallback((evt: React.KeyboardEvent) => {
            if([EKeyboardKey.Escape].includes(evt.key as EKeyboardKey)) {
                if(isPickerVisible){
                    evt.stopPropagation();
                    setPickerVisible(false);
                }
            }
        }, [isPickerVisible]);



        return (<PickerProviderContext.Provider
            value={{
                hide: () => requestAnimationFrame(() => setPickerVisible(false)),
                show: () => setPickerVisible(true),
                toggle: () => setPickerVisible(curr => !curr),
                isVisible: isPickerVisible,

                inputFocus: () => setInputFocus(true),
                inputBlur: () => setInputFocus(false),
                isInputFocus,

                value: value,
                onChange: setValue,
            }}
        >
            <div className={styles.root}>
                <div ref={mainRef} className={styles.mainEl} onKeyDown={disabledKeydown}>
                    <RefMainComponent
                        {...args as P & IValueChange<V>}
                        ref={ref}
                    />
                </div>

                <AnimatePresence>
                    {isPickerVisible &&
                        <MotionDrawer
                            ref={pickerRef}
                            position={getVisiblePosition(mainRef.current)}
                        >
                            <DropdownComponent {...args as P & IValueChange<V>}/>
                        </MotionDrawer>
                    }
                </AnimatePresence>

                {/* 註冊事件 */}
                {isPickerVisible && <PickerHideListener onPickerHide={onPickerHide}/>}

                {isPickerVisible && <MousedownListener onMousedown={handleClickOutSite}/>}
                {isInputFocus && <MousedownListener onMousedown={handleBlurCheck}/>}
                {isInputFocus && <HotkeyListener onKeydown={handleOnShowHotKey}/>}
                {isInputFocus && <HotkeyListener onKeydown={handleOnBlurHotKey}/>}
            </div>

        </PickerProviderContext.Provider>);
    };

    return forwardRef(MotionPicker);
}

export default createPicker;


