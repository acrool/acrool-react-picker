import {Dropdown, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {createPicker, usePicker} from '@acrool/react-picker';
import React, {ForwardedRef} from 'react';
import styled from 'styled-components';

import Button from '../Button';
import ArrowDownSvg from './arrow_down.svg?react';



interface PickerProps<T> {
    className: string
    onChange?: (value: T) => void
    options?: TOption<T>[]
}

/**
 * 下拉選單元件
 *
 * @param style
 * @param className
 * @param ref
 */
const WithButton = <V extends null>({
    className,
}: PickerProps<V>, ref?: ForwardedRef<HTMLButtonElement>) => {

    const Picker = usePicker();

    return <Button
        className={className}
        onClick={Picker.toggle}
    >
        <ArrowDownSvg width={14} height={14}/>
    </Button>;
};


/**
 * Picker
 * @param args
 */
const WithPicker = <V extends null>(args: PickerProps<V>) => {
    const Picker = usePicker();


    const handleOnClick = (value: V|null, isDiff: boolean) => {
        if(args.onChange){
            args.onChange(value);
        }
        Picker.hide();
    };

    return <DropdownRoot>

        {/* 標記版本 */}
        <Flex column>
            <DropTitle>Mark Version</DropTitle>
            <Dropdown
                isDark
                isCheckedEnable={false}
                onClick={handleOnClick}
                onEnter={handleOnClick}
                options={args.options}
            />
        </Flex>



    </DropdownRoot>;
};


const ReleaseVersionPicker = createPicker(
    WithButton,
    WithPicker,
    {
        // ignoreCompare: true,
        // isEnableHideSave: false,
    }
);


export default ReleaseVersionPicker;



const DropTitle = styled.div`
  margin-bottom: 10px;
  margin-right: 10px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 700;
  padding-left: 10px;

`;


const DropdownRoot = styled(Flex)`
  color: #fff;
  background-color: #38393a;
  padding-top: 10px;
  border-radius: 4px;
  border: 1px solid #6c757d;


`;



