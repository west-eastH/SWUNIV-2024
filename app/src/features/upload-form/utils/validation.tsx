import { BoxCreation } from '@entities/upload-box';
import { ModalContext } from '@shared/ui/modal/types';
import { Typo } from '@shared/ui';

const validStringField = (field?: string) => field?.trim() === '';

const createErrorModal = (
  createModal: ModalContext['createModal'],
  openById: (id: string) => void,
  message: string,
) => {
  const id = createModal({
    header: <></>,
    node: () => <Typo size={14}>{message}</Typo>,
  });

  setTimeout(() => openById(id), 10);
};

export const withValidation = (
  body: BoxCreation,
  createModal: ModalContext['createModal'],
  openById: (id: string) => void,
  callback: () => void,
) => {
  if (validStringField(body.title) && body.title.length > 30) {
    return createErrorModal(
      createModal,
      openById,
      '제목을 30자 이하로 입력해주세요.',
    );
  }

  if (validStringField(body.uploader)) {
    return createErrorModal(
      createModal,
      openById,
      '닉네임을 4글자 이상으로 설정해주세요.',
    );
  }

  if (body.password.length < 4) {
    return createErrorModal(
      createModal,
      openById,
      '비밀번호를 4자리 이상 입력해주세요.',
    );
  }

  if (!body.files || body.files.length === 0) {
    return createErrorModal(
      createModal,
      openById,
      '파일을 1개 이상 업로드해주세요.',
    );
  }

  callback();
};
