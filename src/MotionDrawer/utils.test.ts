import React from 'react';

import {EHorizontal, EVertical, IPosition} from '../types';
import {getScrollParent, updatePosition} from './utils';

// 用於模擬 DOM 結構
function createElementWithParent({overflowY = 'auto', scrollHeight = 200, clientHeight = 100} = {}) {
    const parent = document.createElement('div');
    Object.defineProperty(parent, 'scrollHeight', {value: scrollHeight});
    Object.defineProperty(parent, 'clientHeight', {value: clientHeight});
    parent.style.overflowY = overflowY;
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);
    return {parent, child};
}

describe('getScrollParent', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('應該回傳最近的可滾動父元素', () => {
        const {parent, child} = createElementWithParent();
        expect(getScrollParent(child)).toBe(parent);
    });

    it('沒有可滾動父元素時應回傳 window', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        expect(getScrollParent(div)).toBe(window);
    });
});

describe('updatePosition', () => {
    function setupDOM(anchorRect: Partial<DOMRect> = {}, pickerRect: Partial<DOMRect> = {}) {
        const anchor = document.createElement('div');
        const anchorChild = document.createElement('div');
        anchor.appendChild(anchorChild);
        document.body.appendChild(anchor);
        const picker = document.createElement('div');
        document.body.appendChild(picker);
        // 模擬 getBoundingClientRect
        anchorChild.getBoundingClientRect = jest.fn(() => ({
            top: 100,
            bottom: 150,
            left: 50,
            right: 150,
            width: 100,
            height: 50,
            ...anchorRect,
        }) as DOMRect);
        picker.getBoundingClientRect = jest.fn(() => ({
            width: 100,
            height: 100,
            ...pickerRect,
        }) as DOMRect);
        return {anchor, anchorChild, picker};
    }

    it('應該根據預設 bottom 對齊並設置樣式', () => {
        const {anchor, anchorChild, picker} = setupDOM();
        const anchorRef = {current: anchor} as React.RefObject<HTMLElement>;
        const pickerRef = {current: picker} as React.RefObject<HTMLElement>;
        const setVertical = jest.fn();
        updatePosition(anchorRef, pickerRef, setVertical);
        expect(setVertical).toHaveBeenCalledWith(EVertical.bottom);
        expect(picker.style.top).toMatch(/px/);
        expect(picker.style.left).toMatch(/px/);
        expect(picker.style.minWidth).toBe('100px');
        expect(picker.style.transformOrigin).toBe('top');
        expect(picker.style.flexDirection).toBe('column');
    });

    it('應該根據 importantPosition 強制設置 top', () => {
        const {anchor, anchorChild, picker} = setupDOM();
        const anchorRef = {current: anchor} as React.RefObject<HTMLElement>;
        const pickerRef = {current: picker} as React.RefObject<HTMLElement>;
        const setVertical = jest.fn();
        const importantPosition: IPosition = {vertical: EVertical.top, horizontal: EHorizontal.right};
        updatePosition(anchorRef, pickerRef, setVertical, importantPosition);
        expect(setVertical).toHaveBeenCalledWith(EVertical.top);
        expect(picker.style.transformOrigin).toBe('bottom');
        expect(picker.style.flexDirection).toBe('column-reverse');
    });

    it('anchor 或 picker 不存在時不應報錯', () => {
        const setVertical = jest.fn();
        expect(() => updatePosition({current: null}, {current: null}, setVertical)).not.toThrow();
    });
});
