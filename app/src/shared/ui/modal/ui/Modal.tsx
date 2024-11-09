import React from 'react';
import Container from './Container';
import { Modal as Props } from '../types';
import useModal from '../hooks/useModal';
import { Button } from '@shared/ui';
import { ModalButtonSection } from './ModalButtonSection';

const Modal: React.FC<Props> = ({ id, node, header, options }) => {
  const { closeById } = useModal();
  const confirmText = options?.confirmText;
  const close = () => closeById(id);
  const confirm = () => {
    options?.onConfirm?.();
    close();
  };

  return (
    <Container>
      <div className="w-[320px] rounded-md drop-shadow-md bg-white py-[20px] px-[16px] modal">
        <header className="pb-[21px]">{header}</header>
        {node({ close })}

        {!options?.noContent && (
          <ModalButtonSection>
            {options?.onConfirm && (
              <Button
                onClick={confirm}
                className="!h-[42px] flex-1"
                theme="primary"
                textSize={14}
              >
                {confirmText ?? '확인'}
              </Button>
            )}
            <Button
              onClick={() => closeById(id)}
              className="!h-[42px] flex-1"
              textSize={14}
              theme="white"
            >
              닫기
            </Button>
          </ModalButtonSection>
        )}
      </div>
    </Container>
  );
};

export default Modal;
