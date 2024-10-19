import { BoxCreation } from '@entities/upload-box';
import { ModalContext } from '@shared/ui/modal/types';
import { Typo } from '@shared/ui';

const validStringField = (field?: string) => field?.trim() === '';

const createErrorModal = (
  createModal: ModalContext['createModal'],
  message: string,
) => {
  const [_, open] = createModal({
    header: <></>,
    node: () => <Typo size={14}>{message}</Typo>,
  });

  open();
};

export const withValidation = (
  body: BoxCreation,
  createModal: ModalContext['createModal'],
  callback: () => void,
) => {
  console.log('withValidation');
  if (validStringField(body.title)) {
    return createErrorModal(createModal, '제목을 입력해주세요.');
  }

  if (validStringField(body.uploader)) {
    return createErrorModal(
      createModal,
      '닉네임을 4글자 이상으로 설정해주세요.',
    );
  }

  if (body.files.length === 0) {
    return createErrorModal(createModal, '파일을 1개 이상 업로드해주세요.');
  }

  callback();
};
