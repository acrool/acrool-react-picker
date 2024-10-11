import {FCChildrenProps} from '@acrool/react-grid';
import {EKeyboardKey, HotkeyListener,} from '@acrool/react-hotkey';
import {useModal} from '@acrool/react-modal';
import React from 'react';
import styled, {css} from 'styled-components';



interface IModalSetting {
    width?: string
    minHeight?: string
}

interface IProps extends FCChildrenProps {
    isEnableClose?: boolean
    onBackModal?: () => void
    onCloseModal?: () => void
    size?: IModalSetting
    name: string
}


/**
 * 外框容器
 * 自帶ESC關閉
 */
const ModalLayout = ({
    className,
    children,
    isEnableClose = true,
    onBackModal,
    onCloseModal,
    size,
    name,
}: IProps) => {
    const {queueKey} = useModal();

    // const {scopeKeys} = useHotkeyScopeManager();

    /**
     * 關閉光箱預設動作
     */
    const handleCloseModal = () => {
        if(onCloseModal){
            onCloseModal();
        }
    };

    return (
        <>
            <PageRoot className={className} style={size} isEnableClose={isEnableClose}>

                {isEnableClose && (
                    <CloseBottom type="button" onClick={handleCloseModal}>
                        X
                    </CloseBottom>
                )}

                {children}
            </PageRoot>

            <HotkeyListener hotKey={EKeyboardKey.Escape} onKeyDown={handleCloseModal}
                enabledInFormField
                preventDefault
            />
        </>
    );
};

export default ModalLayout;





const PageRoot = styled.div<{
    isEnableClose?: boolean,
}>`
    transition: box-shadow .3s;
    max-width: calc(100% - 20px);
    margin: 0 auto;
    position: relative;

    ${props => props.isEnableClose && css`
      box-shadow: rgb(4 4 4 / 54%) -4px 6px 9px 1px;
    `}
`;



const BackBottom = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  background-color: #007d37;
  padding: 4px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e7e7e7;
  border-top-right-radius: 6px;
`;


const CloseBottom = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
  background-color: var(--primary-color);
  padding: 4px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e7e7e7;
  border-top-right-radius: 6px;
`;

