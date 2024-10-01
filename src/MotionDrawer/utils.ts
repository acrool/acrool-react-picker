
import {RefObject} from 'react';

import {EHorizontal, EVertical} from '../types';

// Cache to store scrollable parent for each element
const scrollParentCache = new WeakMap();

/**
 * Get the closest scrollable parent of an element.
 * Caches results for performance.
 */
export function getScrollParent(element: HTMLElement): HTMLElement | Window {
    // Return from cache if available
    if (scrollParentCache.has(element)) {
        return scrollParentCache.get(element);
    }

    let parent = element.parentElement;

    while (parent) {
        const {overflowY, position} = window.getComputedStyle(parent);
        const isScrollable = overflowY === 'auto' || overflowY === 'scroll';

        if (position === 'fixed' || (isScrollable && parent.scrollHeight > parent.clientHeight)) {
            scrollParentCache.set(element, parent);
            return parent;
        }
        parent = parent.parentElement;
    }

    scrollParentCache.set(element, window);
    return window;
}

/**
 * Update the position of the picker element relative to the anchor element.
 * @param anchorRef Reference to the anchor element.
 * @param pickerRef Reference to the picker element.
 * @param setVertical Callback to set vertical alignment.
 */
export const updatePosition = (
    anchorRef: RefObject<HTMLElement>,
    pickerRef: RefObject<HTMLElement>,
    setVertical: (vertical: EVertical) => void
) => {
    const anchorEl = (anchorRef.current?.firstChild as HTMLDivElement);
    const pickerEl = pickerRef.current;

    if (!anchorEl || !pickerEl) return;

    const pickerRect = pickerEl.getBoundingClientRect();
    const anchorRect = anchorEl.getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const safePadding = 8;

    // Vertical alignment checks
    const pickerTopHeight = anchorRect.top - safePadding;
    const pickerBottomHeight = screenHeight - anchorRect.bottom - safePadding;

    let vertical: EVertical = pickerBottomHeight >= pickerTopHeight ? EVertical.bottom : EVertical.top;
    let pickerHeight = vertical === EVertical.bottom ? pickerBottomHeight : pickerTopHeight;

    // Horizontal alignment checks
    const pickerWidth = pickerRect.width;
    const leftFits = (anchorRect.left + pickerWidth) < screenWidth;
    const rightFits = (anchorRect.right - pickerWidth) > 0;

    let horizontal: EHorizontal = EHorizontal.left;
    if (!leftFits && rightFits) {
        horizontal = EHorizontal.right;
    } else if (!leftFits && !rightFits) {
        horizontal = EHorizontal.left; // Fallback to left
    }

    // Apply styles
    setVertical(vertical);
    pickerEl.style.top = vertical === EVertical.bottom
        ? `${anchorRect.bottom + scrollTop}px`
        : `${anchorRect.top + scrollTop - pickerHeight}px`;

    pickerEl.style.left = horizontal === EHorizontal.left
        ? `${anchorRect.left + scrollLeft}px`
        : `${anchorRect.right + scrollLeft - pickerWidth}px`;

    pickerEl.style.minWidth = `${anchorRect.width}px`;
    pickerEl.style.height = `${pickerHeight}px`;
    pickerEl.style.transformOrigin = vertical === EVertical.bottom ? 'top' : 'bottom';
    pickerEl.style.flexDirection = vertical === EVertical.bottom ? 'column' : 'column-reverse';
};
