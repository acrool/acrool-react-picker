import {removeByIndex} from '@acrool/js-utils/array';
import {isEmpty} from '@acrool/js-utils/equal';
import {createPicker, usePicker} from '@acrool/react-picker';
import clsx from 'clsx';
import React, {ForwardedRef, useEffect, useRef} from 'react';
import styled, {css} from 'styled-components';

import NumberKeyboard from './NumberKeyboard';




interface IProps  {
    name?: string
    value?: string
    disabled?: boolean
    onChange?: (value?: string) => void
    errorMessage?: string
    remarkMessage?: string
    placeholder?: string
    isLink?: boolean
}



const slideInBottom: any = {
    style: {maxWidth: 'inherit'},
    variants: {
        initial: {position: 'fixed', bottom: 0, left: 0, right: 0, translateY: '100%', opacity: .9},
        animate: {translateY: 0, opacity: 1,  transition: {type: 'just'}},
        exit: {translateY: '100%', opacity: .9},
    },
    transition: {
        damping: 0,
    }
};


/**
 * 帶鍵盤輸入內容的選擇器
 *
 * @param style
 * @param disabled 是否禁用
 * @param ref
 */
const KeyboardPickerField = ({
    name,
    disabled = false,
    value,
    placeholder = '-',
    isLink = false,
}: IProps, ref?: ForwardedRef<HTMLButtonElement>) => {
    const Picker = usePicker();


    const isPlaceholderValue = isEmpty(value);

    return <SelectNumberKeyboardRoot
        ref={ref}
        className={clsx('align-items-center justify-content-between column-gap-2')}
        name={name}
        type="button"
        onClick={Picker.toggle}
        isFocus={Picker.isInputFocus}
        onFocus={Picker.inputFocus}

        disabled={disabled}
        isLink={isLink}
    >
        <Text isPlaceholderValue={isPlaceholderValue}>
            {isPlaceholderValue ? placeholder: value}
        </Text>


    </SelectNumberKeyboardRoot>;
};


const Picker = (props: IProps) => {
    const Picker = usePicker();
    const textRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if(textRef.current){
                textRef.current.focus();
            }
        }, 100);
    }, []);




    const handleOnClick = (key: string) => {
        if(!props.onChange) return;

        if(key === 'ok'){
            props.onChange(Picker.value);
            Picker.hide();
            return;
        }
        //
        if(key === 'backspace'){
            const newValue = removeByIndex(Picker.value.split(''), Picker.value.length - 1);
            props.onChange(newValue.join(''));
            return;
        }

        props.onChange(Picker.value + key);

    };


    return <TextFormContainer>
        <NumberKeyboard onClick={handleOnClick}/>
    </TextFormContainer>;
};

export default createPicker(
    KeyboardPickerField,
    Picker,
    {
        motionProps: slideInBottom,
        isEnableHideSave: false,
        isVisibleMask: true,
        isDisabledAutoPosition: true,
    }
);



const TextFormContainer = styled.div`
    background-color: #212529;
    border: 1px solid #6c757d;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    border-radius: 8px;
`;


const Text = styled.div<{
    isPlaceholderValue: boolean,
}>`
    ${props => props.isPlaceholderValue && css`
      color: #6c757d;
    `}
`;


const SelectNumberKeyboardRoot = styled.button<{
    disabled?: boolean,
    isLink?: boolean,
    isFocus?: boolean,
}>`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    height: var(--form-height);
    color: var(--form-color);

    width: 100%;

    font-size: 14px;

    font-weight: 400;
    line-height: 21px;

    background: 0 0;
    background-clip: padding-box;

    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 0;
    border: 1px solid #444;
    padding: 1px 10px;
    min-height: 22px;


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
