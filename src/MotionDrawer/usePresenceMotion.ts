import {usePresence} from 'motion/react';
import {useAnimate} from 'motion/react-mini';
import {RefObject, useEffect, useLayoutEffect, useRef} from 'react';

import {IMotionOptions} from '../types';
import {maskMotion} from './config';
import {applyFinalKeyframe, checkIsSkipMotion} from './utils';


/**
 * 在 client 用 useLayoutEffect（paint 前啟動動畫），SSR 退回 useEffect 以免警告。
 * 用 layout effect 是為了避免第一格先以最終樣子畫出來才開始進場。
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface IArgs {
    maskRef: RefObject<HTMLElement|null>
    mainRef: RefObject<HTMLElement|null>
    motionProps?: IMotionOptions
}

interface IPlayback {
    cancel: () => void
    finished: Promise<unknown>
}


/**
 * 播放進場、離場動畫 (遮罩 + 主內容)
 *
 * 離場後才移除節點由 AnimatePresence + usePresence 處理 (需放在 AnimatePresence 內)，
 * 動畫由 motion mini (Web Animations API) 播放
 *
 * @param maskRef
 * @param mainRef
 * @param motionProps
 */
const usePresenceMotion = ({maskRef, mainRef, motionProps}: IArgs) => {
    const [isPresent, safeToRemove] = usePresence();
    const [, animate] = useAnimate();

    // 離場動畫結束時用來確認「是否仍在離場」：離場途中又被開啟的話，舊的離場不可以把節點移除
    const isPresentRef = useRef(isPresent);
    isPresentRef.current = isPresent;

    // 離場動畫的控制器：離場途中又被開啟時要取消，否則離場的縮放會停留在選單上
    const exitPlaybackRef = useRef<IPlayback[]>([]);

    useIsomorphicLayoutEffect(() => {
        const step = isPresent ? 'enter': 'exit';
        const maskEl = maskRef.current;
        const mainEl = mainRef.current;
        const mainMotion = motionProps?.[step];

        /**
         * 通知 AnimatePresence 可以移除節點。
         * 一律延後到 microtask：AnimatePresence 是在「自己的」layout effect 才把這個子節點標成離場中，
         * 而子層的 layout effect 比它早執行，同步呼叫會被當成無效而忽略，節點就永遠不會被移除。
         */
        const removeWhenStillExiting = () => {
            if(!isPresentRef.current) safeToRemove?.();
        };

        if(checkIsSkipMotion()){
            if(isPresent && mainEl) applyFinalKeyframe(mainEl, motionProps?.enter);
            if(!isPresent) Promise.resolve().then(removeWhenStillExiting);
            return;
        }

        if(isPresent){
            exitPlaybackRef.current.forEach(playback => playback.cancel());
            exitPlaybackRef.current = [];
        }

        const playbacks: IPlayback[] = [];
        if(maskEl){
            playbacks.push(animate(maskEl, maskMotion[step].keyframes, maskMotion[step].options));
        }
        if(mainEl && mainMotion){
            playbacks.push(animate(mainEl, mainMotion.keyframes, mainMotion.options));
        }

        if(!isPresent){
            exitPlaybackRef.current = playbacks;

            // 離場動畫播完才讓 AnimatePresence 移除節點；動畫被中斷時也要走到這裡，避免節點殘留
            Promise.all(playbacks.map(playback => playback.finished))
                .catch(() => undefined)
                .then(removeWhenStillExiting);
        }
    }, [isPresent]);

    return {isPresent};
};

export default usePresenceMotion;
