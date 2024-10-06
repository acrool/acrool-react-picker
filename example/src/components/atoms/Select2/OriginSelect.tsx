import {isEmpty} from '@acrool/js-utils/equal';
import {Dropdown, IDropdownOption, isGroupOptions, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {createPicker, EVertical, usePicker} from '@acrool/react-picker';
import clsx from 'clsx';
import React, {ForwardedRef, useEffect, useMemo, useRef} from 'react';
import styled, {css} from 'styled-components';

import ArrowDownSvg from './arrow_down.svg?react';


interface IOption {
    text: string
    value: string
}

export interface IProps  {
    value?: string
    onChange: (value: string) => void
    name?: string
    options?: IOption[]
    disabled?: boolean
    ref?: any
}


/**
 * 下拉選單元件
 *
 * @param style
 * @param options 下拉選單項目
 * @param disabled 是否禁用
 * @param value
 * @param ref
 */
const OriginSelect = ({
    options,
    disabled = false,
    value,
}: IProps, ref?: ForwardedRef<HTMLSelectElement>) => {

    // return <div>asda</div>

    return <OriginSelectRoot
        ref={ref}
        disabled={disabled}
    >
        {options?.map(row => {
            return <option value={row.value} key={row.value}>{row.text}</option>;
        })}
    </OriginSelectRoot>;
};


export default React.forwardRef(OriginSelect);


const OriginSelectRoot = styled.select<{
    disabled?: boolean,
    isLink?: boolean,
    isFocus?: boolean,
}>`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    height: var(--form-height);

    width: 100%;

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
