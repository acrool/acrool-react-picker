import Logger from '@acrool/js-logger';
import {EKeyboardKey, HotkeyListener} from '@acrool/react-hotkey';
import ReactPortal from '@acrool/react-portal';
import {AnimatePresence} from 'framer-motion';
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import {ulid} from 'ulid';

import MousedownListener from '../listener/MousedownListener';
import PickerHideListener from '../listener/PickerHideListener';
import styles from '../modal.module.scss';
import MotionDrawer from '../MotionDrawer';
import {PickerProviderContext} from '../PickerProvider';
import {EVertical, IPickerOption, IValueChange} from '../types';
import {setForwardedRef} from '../utils';



/**
 * 產生帶 framer-motion 功能的Picker
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

    const RefMainComponent = forwardRef(MainComponent as React.ForwardRefRenderFunction<P & IValueChange<V>>) as React.ForwardRefExoticComponent<React.RefAttributes<P & IValueChange<V>>>;

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
         * 處理 Esc 熱鍵關閉 狀態
         * @param isFocus
         */
        const onEscHotkey = useCallback(() => {
            mainRef.current.focus();
            setPickerVisible(false);
        }, []);

        /**
         * 處理當鍵盤按 Tab 的時候關閉選單與注視
         */
        const onNavHotKey = useCallback((evt: React.KeyboardEvent) => {
            setPickerVisible(false);
            setInputFocus(false);
        }, []);


        /**
         * 處理當鍵盤按[上 下 空白]的時候開啟選單
         */
        const handleOnShowHotKey = useCallback((evt: React.KeyboardEvent) => {
            setPickerVisible(true);
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

                vertical,
                setVertical,
            }}
        >
            <div className={styles.root}>
                <div ref={anchorRef} className={styles.mainEl}>
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
                            <MotionDrawer
                                ref={pickerRef}
                                anchorRef={anchorRef}
                                isDebug={options?.isDebug}
                            >
                                <DropdownComponent {...args as P & IValueChange<V>}/>
                            </MotionDrawer>
                        </ReactPortal>
                    }
                </AnimatePresence>

                {/* 註冊事件 */}
                {isPickerVisible && <PickerHideListener onPickerHide={onPickerHide}/>}

                {isEnableClickOutSiteHidden && isPickerVisible && <MousedownListener onMousedown={handleClickOutSite}/>}

                {/* Show */}
                {isInputFocus && <MousedownListener onMousedown={handleBlurCheck}/>}
                {isInputFocus && <HotkeyListener
                    hotKey={[
                        EKeyboardKey.ArrowUp,
                        EKeyboardKey.ArrowDown,
                        EKeyboardKey.Space,
                    ]}
                    onKeyDown={handleOnShowHotKey}
                    stopPropagation
                    preventDefault
                />}

                {/* Nav */}
                {isInputFocus && <HotkeyListener
                    hotKey={[
                        EKeyboardKey.Tab,
                        EKeyboardKey.ShiftAndTab
                    ]}
                    onKeyDown={onNavHotKey}
                />}

                {/* Hide */}
                {isInputFocus && <HotkeyListener
                    hotKey={[
                        EKeyboardKey.Escape,
                    ]}
                    onKeyDown={onEscHotkey}
                />}
            </div>

        </PickerProviderContext.Provider>);
    };

    return forwardRef(MotionPicker);
}

export default createPicker;


