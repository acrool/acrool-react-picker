import {isEmpty} from '@acrool/js-utils/equal';
import {Dropdown, IDropdownOption, isGroupOptions, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {createPicker, EVertical, usePicker} from '@acrool/react-picker';
import clsx from 'clsx';
import CSS from 'csstype';
import React, {ForwardedRef, useEffect, useMemo, useRef} from 'react';
import styled, {css} from 'styled-components';

import ArrowDownSvg from './arrow_down.svg?react';


export interface IProps<V> {
    style?: CSS.Properties,
    className?: string
    isDark?: boolean
    value?: V
    onChange: (value: V) => void
    name?: string
    options?: TOption<V>[]
    disabled?: boolean
    errorMessage?: string
    remarkMessage?: string
    placeholder?: string
    isSearchEnable?: boolean
    isAvatarEnable?: boolean
    isLink?: boolean
    isBlock?: boolean
    isDropdownBlock?: boolean
    ref?: any
}


/**
 * 下拉選單元件
 *
 * @param style
 * @param className
 * @param isDark
 * @param options 下拉選單項目
 * @param disabled 是否禁用
 * @param value
 * @param placeholder
 * @param isAvatarEnable
 * @param isLink
 * @param isBlock
 * @param ref
 */
const Select2 = <V extends null>({
    style,
    className,
    isDark,
    options,
    disabled = false,
    value,
    placeholder,
    isAvatarEnable = false,
    isLink = false,
    isBlock = false,
}: IProps<V>, ref?: ForwardedRef<HTMLButtonElement>) => {

    const Picker = usePicker();

    /**
     * 取得選中的文字
     */
    const valueText = useMemo(() => {
        let current: IDropdownOption<V>|undefined;
        options?.findIndex((row) => {
            if(row){
                if(isGroupOptions(row)){
                    current = row.children.find(row => row.value === value);
                    return typeof current !== 'undefined';
                }
                current = row.value === value ? row: undefined;
            }
            return typeof current !== 'undefined';
        });

        return current ?
            <Flex className="align-items-center">
                {/*{isAvatarEnable && <Avatar color={current.color} image={current.avatarUrl} size={15} className="mr-1"/>}*/}
                {current.text}
            </Flex>
            :placeholder;


    }, [value, options, placeholder]);

    // Select
    const isPlaceholderValue = isEmpty(value);
    return <Select2Root
        ref={ref}
        style={style}
        className={clsx(className, 'align-items-center justify-content-between column-gap-2')}
        type="button"
        onMouseDown={Picker.toggle}
        isFocus={Picker.isInputFocus}
        onFocus={Picker.inputFocus}
        disabled={disabled}
        isLink={isLink}
        isBlock={isBlock}
        isDark={isDark}
    >
        <Text isPlaceholderValue={isPlaceholderValue}>
            {valueText}
        </Text>

        {!isLink && (
            <ArrowDownIcon>
                <ArrowDownSvg width={14} height={14}/>
            </ArrowDownIcon>
        )}
    </Select2Root>;
};


/**
 * Picker
 * @param args
 */
const Picker = <V extends null>(args: IProps<V>) => {
    const {placeholder, options, value, onChange, isAvatarEnable, isSearchEnable} = args;
    const Picker = usePicker();
    const searchForwardedRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     window.setTimeout(() => {
    //         if(searchForwardedRef.current){
    //             searchForwardedRef.current.focus();
    //         }
    //     }, 10);
    // }, []);

    /**
     * 取得加上Placeholder的Options
     */
    const placeholderOptions: TOption<V|null>[]|undefined = useMemo(() => {
        if(placeholder){
            const placeholderOption: IDropdownOption<V|null> = {text: placeholder, value: null};
            return options ? [placeholderOption].concat(options as IDropdownOption<V>[]): [placeholderOption];
        }
        return options;
    }, [options, placeholder]);


    const handleOnClick = (value: V|null) => {
        Picker.onChange(value);
        Picker.hide();
    };

    return <>
        <Dropdown
            value={value}
            isDark={args.isDark}
            onClick={handleOnClick}
            onEnter={handleOnClick}
            className={clsx({'w-100': args.isDropdownBlock})}
            options={placeholderOptions}
            isAvatarEnable={isAvatarEnable}
            isSearchEnable={isSearchEnable}
            isCheckedEnable
            // searchForwardedRef={searchForwardedRef}
            searchTextPlaceholder="type keyword..."
            isReverse={Picker.vertical === EVertical.top}
        />
    </>;
};


export default createPicker(
    Select2,
    Picker,
    {isDebug: false}
) as <V extends any>(props: IProps<V>) => JSX.Element;




const Text = styled.div<{
    isPlaceholderValue: boolean,
}>`
    white-space:nowrap;
    ${props => props.isPlaceholderValue && css`
      color: #6c757d;
    `}
`;


const ArrowDownIcon = styled.div`
    flex: 0 0 auto;
    margin-left: 5px;
    display: flex;
    align-items: center;
`;


const Select2Root = styled.button<{
    disabled?: boolean,
    isLink?: boolean,
    isFocus?: boolean,
    isBlock?: boolean,
    isDark?: boolean
}>`
  ${props => props.isDark && css`
    --form-color: #ccc;
  `}
  
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    height: var(--form-height);
    width: ${props => props.isBlock ? '100%': 'auto'};


    font-size: 14px;
    color: var(--form-color);

    font-weight: 400;
    line-height: 21px;

    background: 0 0;
    background-clip: padding-box;

    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 0;
    border: 1px solid #444;
    padding: 1px 10px;


    ${props => props.isLink && css`
        height: auto;
        padding: 0;
        border: none;
    `}

    ${props => props.isFocus && css`
        box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    `}


    ${props => props.disabled && css`
        opacity: .7;
        pointer-events: none;
    `}
`;
