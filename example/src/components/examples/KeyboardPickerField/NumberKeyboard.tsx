import {FCProps} from '@acrool/react-grid';
import React from 'react';
import styled from 'styled-components';

import Button from '../../atoms/Button';



interface IProps extends FCProps {
    onClick?: (key: string) => void
}


const keyboards = [
    '7', '8', '9', 'backspace',
    '4', '5', '6', 'ok',
    '1', '2', '3',
    '00', '0', '.'
];


/**
 * 下注快速輸入鍵盤 (完整)
 * @param className
 * @param onClick
 */
const NumberKeyboard = ({
    className,
    onClick,
}: IProps) => {


    /**
     * 產生處理點擊方法
     * @param key
     */
    const generatorHandleOnClick = (key: string) => {
        return () => {
            if (onClick) {
                return onClick(key);
            }
        };
    };


    /**
     * 渲染按鈕
     */
    const renderButton = () => {
        return keyboards.map(key => {

            if (key === 'ok') {
                return <MyButton
                    key={key}
                    onClick={generatorHandleOnClick(key)}
                >
                    OK
                </MyButton>;
            }

            if (key === 'backspace') {
                return <MyButton
                    key={key}
                    onClick={generatorHandleOnClick(key)}
                >
                    {'<'}
                </MyButton>;
            }

            return <MyButton
                key={key}
                onClick={generatorHandleOnClick(key)}
            >
                {key}
            </MyButton>;
        });
    };

    return <NumberKeyboardRoot className={className}>
        {renderButton()}
    </NumberKeyboardRoot>;
};

export default NumberKeyboard;



const MyButton = styled(Button)`
    border-radius: 4px;
    background: var(--game_button_same, #23283A);

    color: var(--white, #FFF);
    font-size: 18px;
    font-weight: 600;

    height: 42px;
    align-items: center;
    justify-content: center;
`;


const NumberKeyboardRoot = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;

    background-color: var(--text_d_d, #2E344C);
    padding: 5px;

    margin: 0 auto;
    width: var(--body-max-width);
    max-width: 100%;
`;

