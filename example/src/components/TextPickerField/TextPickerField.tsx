import {isEmpty} from '@acrool/js-utils/equal';
import {Flex} from '@acrool/react-grid';
import {createPicker, usePicker} from '@acrool/react-picker';
import clsx from 'clsx';
import React, {ForwardedRef, useEffect, useRef} from 'react';
import styled, {css} from 'styled-components';

import Button from '../Button';
import TextField from '../TextField';




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



/**
 * 輸入內容的選擇器
 *
 * @param style
 * @param disabled 是否禁用
 * @param ref
 */
const TextPickerField = ({
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



    const handleSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if(props.onChange){
            props.onChange(Picker.value);
        }
        Picker.hide();
    };


    return <TextFormContainer onSubmit={handleSubmitHandler}>
        <TextField
            ref={textRef}
            value={Picker.value ?? ''}
            onChange={Picker.onChange}
            placeholder={props.placeholder}
        />
        <Flex className="gap-2">
            <Button color="primary" size="xs" isBlock type="submit">Save</Button>
            <Button color="gray" size="xs" isBlock onClick={Picker.hide}>Cancel</Button>
        </Flex>
    </TextFormContainer>;
};

export default createPicker(
    TextPickerField,
    Picker,
    {isEnableHideSave: false}
);


const TextFormContainer = styled.form`
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
