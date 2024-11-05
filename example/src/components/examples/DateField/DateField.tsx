import {isEmpty} from '@acrool/js-utils/equal';
import {Datepicker} from '@acrool/react-datepicker';
import {createPicker, usePicker} from '@acrool/react-picker';
import clsx from 'clsx';
import CSS from 'csstype';
import React, {ForwardedRef} from 'react';
import styled, {css} from 'styled-components';

import ArrowDownSvg from './date.svg?react';


interface IProps {
    style?: CSS.Properties,
    className?: string
    id?: string
    isDark?: boolean
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
    minYear?: number
    isVisibleSetToday?: boolean
    isLink?:boolean
}


/**
 * 日期區間選擇器
 * @param id
 * @param placeholder
 * @param disabled
 * @param isLink
 * @param ref
 */
const DateField = ({
    style,
    className,
    id,
    placeholder,
    disabled = false,
    isLink,
}: IProps, ref?: ForwardedRef<HTMLButtonElement>) => {
    const Picker = usePicker();

    /**
     * 清除
     */
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();

        Picker.onChange(null);

    };

    const isPlaceholderValue = isEmpty(Picker.value);

    return <DateFieldRoot
        ref={ref}
        style={style}
        className={clsx(className, 'align-items-center justify-content-between column-gap-2')}
        id={id}
        type="button"
        onMouseDown={Picker.toggle}
        // onClick={Picker.toggle}
        isFocus={Picker.isInputFocus}
        onFocus={Picker.inputFocus}
        // onBlur={Picker.inputBlur}

        disabled={disabled}
        isLink={isLink}

    >
        <Text isPlaceholderValue={isPlaceholderValue}>
            {
                isPlaceholderValue ? placeholder ?? 'Select date':
                    Picker.value
            }
        </Text>
        {Picker.isInputFocus ? 'Focus':'Blur'}

        {!isPlaceholderValue &&
            <div role="button" onMouseDown={handleClear}>
                <ArrowDownSvg width={14} height={14}/>
            </div>
        }

    </DateFieldRoot>;

};

const Picker = (props: IProps) => {
    const Picker = usePicker();


    return <Datepicker
        isDark={props.isDark}
        value={Picker.value}
        minYear={props.minYear}
        onChange={(date) => {
            Picker.onChange(date);
        }}
        isVisibleSetToday={props.isVisibleSetToday}
    />;
};


export default createPicker(
    DateField,
    Picker
);




const Text = styled.div<{
    isPlaceholderValue: boolean,
}>`
    white-space:nowrap;
    ${props => props.isPlaceholderValue && css`
      color: #6c757d;
    `}
`;



const DateFieldRoot = styled.button<{
    disabled?: boolean,
    isLink?: boolean,
    isFocus?: boolean,
    isDark?: boolean,
}>`
  ${props => !props.isDark && css`
    --form-color: #ccc;
  `}
  
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;

  height: var(--form-height);
  color: var(--form-color);

  width: 100%;

  font-size: 14px;

  font-weight: 400;
  line-height: 21px;

  background: 0 0;
  background-clip: padding-box;

  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  margin-bottom: 0;
  border: 1px solid #444;
  padding: 1px 10px;
  min-height: 22px;


  ${props => props.isLink && css`
    height: auto;
    padding: 2px;
    border: none;
  `}
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 0, 166, 0.25);
  }

  ${props => props.isFocus && css`
    box-shadow: 0 0 0 0.2rem rgba(255, 0, 21, 0.35);

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(255, 0, 21, 0.75);
    }
  `}


  ${props => props.disabled && css`
        opacity: .7;
        pointer-events: none;
    `}
`;

