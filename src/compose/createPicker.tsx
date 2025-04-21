import Logger from '@acrool/js-logger';
import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import {ulid} from 'ulid';

import {EKeyboardKey} from '../config';
import MousedownListener from '../listener/MousedownListener';
import PickerHideListener from '../listener/PickerHideListener';
import styles from '../modal.module.scss';
import MotionDrawer from '../MotionDrawer';
import MotionDrawerWithout from '../MotionDrawer/MotionDrawerWithout';
import {PickerProviderContext} from '../PickerProvider';
import {EVertical, IPickerOption, IValueChange} from '../types';
import {setForwardedRef} from '../utils';



/**
 * 產生帶 motion/react 功能的Picker
 *
 * 需要呼叫 show 才會傳送到 portal
 * @param MainComponent
 * @param DropdownComponent
 * @param options
 */
function createPicker<V extends {}, P>(
    MainComponent: React.FC<P & IValueChange<V>>,
    DropdownComponent: React.FC<P & IValueChange<V>>,
    options?: IPickerOption
) {

    const RefMainComponent = MainComponent as React.ForwardRefExoticComponent<React.RefAttributes<P & IValueChange<V>>>;

    /**
     * Add framer motion
     * @param args
     * @param ref
     */
    const MotionPicker = (args, ref?: React.Ref<P & IValueChange<V>>) => {
        const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
        const [isInputFocus, setInputFocus] = useState<boolean>(false);
        const [vertical, setVertical] = useState<EVertical>(EVertical.bottom);


        const [value, setValue] = useState<V>();
        const pickerRef = useRef<HTMLDivElement>(null);
        const mainRef = useRef<any>(null);
        const anchorRef = useRef<HTMLDivElement>(null);
        const runTimeValueRef = useRef<V|undefined>(value);
        const isEnableClickOutSiteHidden = options?.isEnableClickOutSiteHidden !== false;
        const isEnableHideSave = options?.isEnableHideSave !== false;
        const isVisibleMask = options?.isVisibleMask;

        useEffect(() => {
            // 同步 Props value 異動
            setValue(args.value);

        }, [JSON.stringify(args.value)]);


        useEffect(() => {
            // 同步 value (為了讓 event listener 可以拿到)
            runTimeValueRef.current = value;
        }, [value]);


        useEffect(() => {
            // on hide Reset
            if(isPickerVisible){
                setValue(args.value);
            }
        }, [isPickerVisible, args.value]);


        /**
         * 處理按鍵
         */
        const handleOnKeyDown = useCallback((e: React.KeyboardEvent) => {
            switch (e.key){
            case EKeyboardKey.Escape:
                onEscHotkey(isPickerVisible)(e);
                break;

            case EKeyboardKey.Tab:
            case EKeyboardKey.ShiftAndTab:
                onNavHotKey(e);
                break;

            case EKeyboardKey.ArrowUp:
            case EKeyboardKey.ArrowDown:
            case EKeyboardKey.Space:
                handleOnShowHotKey(e);
                break;
            }
        }, [isPickerVisible]);

        
        
        /**
         * 處理 Esc 熱鍵關閉 狀態
         * @param isFocus
         */
        const onEscHotkey = useCallback((isPickerVisible: boolean) => {

            return (e: React.KeyboardEvent) => {
                if(isPickerVisible){
                    e.stopPropagation();
                    e.preventDefault();
                    mainRef.current?.focus();
                    setPickerVisible(false);
                }
            };
        }, []);

        /**
         * 處理當鍵盤按 Tab 的時候關閉選單與注視
         */
        const onNavHotKey = useCallback((e: React.KeyboardEvent) => {
            mainRef.current?.focus();

            setPickerVisible(false);
            setInputFocus(false);
        }, []);


        /**
         * 處理當鍵盤按[上 下 空白]的時候開啟選單
         */
        const handleOnShowHotKey = useCallback((e: React.KeyboardEvent) => {
            e.preventDefault();

            setPickerVisible(true);
        }, []);


        /**
         * 處理關閉視窗
         */
        const handleOnHide = useCallback(() => {
            // focus 是為了讓 Tab 到下一個可以正常
            requestAnimationFrame(() => {
                if(options?.isDisabledHideAutoFocus){
                    setInputFocus(false);
                }else{
                    mainRef.current?.focus();
                }
                setPickerVisible(false);
            });
        }, [options?.isDisabledHideAutoFocus]);

        /**
         * 處理切換開關視窗
         */
        const handleOnToggle = useCallback(() => {
            // focus 是為了讓 Tab 到下一個可以正常
            setPickerVisible(curr => {
                if(curr){
                    requestAnimationFrame(() => {
                        mainRef.current?.focus();
                    });
                }
                return !curr;
            });

        }, []);

        /**
         * 模擬選單是已關閉狀態 但 還在 Focus狀態，關閉 Focus 狀態
         */
        const handleBlurCheck = useCallback((evt: MouseEvent) => {
            if(!pickerRef.current &&
                anchorRef.current && !anchorRef.current.contains(evt.target as Node)
            ){
                setInputFocus(false);
            }
        }, []);


        /**
         * 模擬下拉選單 "點擊區域外"，將下拉選單關閉
         */
        const handleClickOutSite = useCallback((evt: MouseEvent) => {
            const pickerChild = pickerRef.current?.firstChild as HTMLElement;
            if(pickerChild && !pickerChild.contains(evt.target as Node) &&
                anchorRef.current && !anchorRef.current.contains(evt.target as Node)
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

            // 異動資料
            if(typeof runTimeValueRef.current !== 'undefined' && isEnableHideSave){
                const isDiff = JSON.stringify(value) !== JSON.stringify(runTimeValueRef.current);
                if(isDiff){
                    args.onChange(runTimeValueRef.current);
                }
            }
        }, [value, args.onChange, isEnableHideSave]);


        /**
         * 渲染主內容
         */
        const renderMotionDrawer = () => {

            if(options?.isDisabledAutoPosition){
                return <MotionDrawerWithout
                    ref={pickerRef}
                    isDebug={options?.isDebug}
                    onKeyDown={handleOnKeyDown}
                    isVisibleMask={isVisibleMask}
                    motionProps={options?.motionProps}
                >
                    <DropdownComponent {...args as P & IValueChange<V>}/>
                </MotionDrawerWithout>;
            }

            return <MotionDrawer
                ref={pickerRef}
                anchorRef={anchorRef}
                isDebug={options?.isDebug}
                onKeyDown={handleOnKeyDown}
                isVisibleMask={isVisibleMask}
            >
                <DropdownComponent {...args as P & IValueChange<V>}/>
            </MotionDrawer>;
        };



        return (<PickerProviderContext.Provider
            value={{
                hide: handleOnHide,
                show: () => setPickerVisible(true),
                toggle: handleOnToggle,
                isVisible: isPickerVisible,

                inputFocus: () => setInputFocus(true),
                inputBlur: () => setInputFocus(false),
                isInputFocus,

                value: value,
                onChange: setValue,

                importantPosition: options?.importantPosition,

                vertical,
                setVertical,
            }}
        >
            <>
                <div ref={anchorRef} 
                    className={styles.mainEl}
                    onKeyDown={handleOnKeyDown}
                >
                    <RefMainComponent
                        {...args as P & IValueChange<V>}
                        ref={setForwardedRef(ref, mainRef)}
                    />
                </div>

                <AnimatePresence>
                    {isPickerVisible &&
                        <ReactPortal
                            id={`acrool-react-picker-${ulid().toLowerCase()}`}
                            className={styles.pickerEl}
                        >
                            {renderMotionDrawer()}
                        </ReactPortal>
                    }
                </AnimatePresence>

                {/* 註冊事件 */}
                {isPickerVisible && <PickerHideListener onPickerHide={onPickerHide}/>}

                {isEnableClickOutSiteHidden && isPickerVisible && <MousedownListener onMousedown={handleClickOutSite}/>}

                {/* Show */}
                {isInputFocus && <MousedownListener onMousedown={handleBlurCheck}/>}

            </>

        </PickerProviderContext.Provider>);
    };

    return forwardRef(MotionPicker);
}

export default createPicker;


