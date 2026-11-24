import {act, fireEvent, render, screen} from '@testing-library/react';
import React, {ForwardedRef} from 'react';

import {usePicker} from '../PickerProvider';
import createPicker from './createPicker';


// js-logger 只有 ESM (.mjs) 的版本，jest 不轉譯它；測試裡用不到實際的輸出
jest.mock('@acrool/js-logger', () => ({
    __esModule: true,
    default: {warning: jest.fn(), info: jest.fn(), danger: jest.fn()},
}));


interface IProps {
    value?: string
    onChange?: (value: string) => void
}

const Main = (props: IProps, ref?: ForwardedRef<HTMLButtonElement>) => {
    const Picker = usePicker();
    return <button ref={ref} type="button" data-testid="main" onClick={Picker.toggle}>
        {Picker.value ?? 'empty'}
    </button>;
};

const Dropdown = () => {
    const Picker = usePicker();
    return <ul data-testid="dropdown">
        <li data-testid="option-b" onClick={() => {
            Picker.onChange('b');
            Picker.hide();
        }}>b</li>
    </ul>;
};

/**
 * 等 requestAnimationFrame 與後續的畫面更新
 */
const flushFrame = async () => {
    await act(async () => {
        await new Promise(resolve => window.requestAnimationFrame(() => resolve(undefined)));
    });
};


describe('createPicker', () => {
    it('預設不顯示選單，點主元件後顯示在 portal', async () => {
        const Picker = createPicker(Main, Dropdown);
        render(<Picker value="a" onChange={jest.fn()}/>);

        expect(screen.queryByTestId('dropdown')).toBeNull();

        fireEvent.click(screen.getByTestId('main'));
        await flushFrame();

        expect(screen.queryByTestId('dropdown')).not.toBeNull();
        expect(screen.getByTestId('main').contains(screen.getByTestId('dropdown'))).toBe(false);
    });

    it('再點一次關閉：沒有 Web Animations API 的環境不等動畫，直接移除', async () => {
        const Picker = createPicker(Main, Dropdown);
        render(<Picker value="a" onChange={jest.fn()}/>);

        fireEvent.click(screen.getByTestId('main'));
        await flushFrame();
        fireEvent.click(screen.getByTestId('main'));
        await flushFrame();

        expect(screen.queryByTestId('dropdown')).toBeNull();
    });

    it('選了項目後關閉，並以新的值呼叫 onChange', async () => {
        const onChange = jest.fn();
        const Picker = createPicker(Main, Dropdown);
        render(<Picker value="a" onChange={onChange}/>);

        fireEvent.click(screen.getByTestId('main'));
        await flushFrame();
        fireEvent.click(screen.getByTestId('option-b'));
        await flushFrame();
        await flushFrame();

        expect(screen.queryByTestId('dropdown')).toBeNull();
        expect(onChange).toHaveBeenCalledWith('b');
    });

    it('不自動定位時套用 motionProps 的固定樣式與 className', async () => {
        const Picker = createPicker(Main, Dropdown, {
            isDisabledAutoPosition: true,
            motionProps: {
                className: 'custom-picker',
                style: {position: 'fixed', bottom: 0},
                enter: {keyframes: {transform: ['translateY(100%)', 'translateY(0%)']}},
            },
        });
        render(<Picker value="a" onChange={jest.fn()}/>);

        fireEvent.click(screen.getByTestId('main'));
        await flushFrame();

        const wrapper = screen.getByTestId('dropdown').parentElement as HTMLElement;
        expect(wrapper.className).toContain('custom-picker');
        expect(wrapper.style.position).toBe('fixed');
        // 不播放動畫時直接套用進場的最後一格
        expect(wrapper.style.transform).toBe('translateY(0%)');
    });
});
