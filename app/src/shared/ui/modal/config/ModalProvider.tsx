import React, { ReactNode, useEffect } from 'react';
import ModalContext from '@shared/ui/modal/config/ModalContext';
import { Modal as ModalType, ModalContext as Context } from '../types';
import { nanoid } from 'nanoid';
import Modal from '../ui/Modal';
import { Dimmed } from '@shared/ui/modal/ui/Dimmed';
import { create } from 'zustand/react';
import { Typo } from '@shared/ui';

type Props = {
  children: ReactNode;
};

type StoreStates = {
  modals: ModalType[];
  setModals: (modals: ModalType[]) => void;
  addModal: (modal: ModalType) => void;
};

const useModalStore = create<StoreStates>((set, get) => ({
  modals: [],
  setModals: (modals: ModalType[]) => set({ modals }),
  addModal: (modal: ModalType) => set({ modals: get().modals.concat(modal) }),
}));

const modalStore = useModalStore;

const ModalProvider: React.FC<Props> = ({ children }) => {
  const { modals, setModals, addModal } = useModalStore();
  const isOpenAnyModal = modals.some((modal) => modal.open);
  console.log({ modals });

  const createModal: Context['createModal'] = ({
    id,
    node,
    header,
    options,
  }) => {
    if (id && checkExists(id, modals)) return id;

    const newId = id ?? generateId();
    const newNode: ModalType = {
      id: newId,
      node,
      header,
      options,
      open: false,
    };
    addModal(newNode);
    return newId;
  };

  const openById = (id: string) => {
    const modals = modalStore.getState().modals;
    const found = modals.find((r) => r.id === id);
    if (!found) {
      throw new Error(`Apply Modal Not Found [ID: ${id}]`);
    }
    setModals(updateToOpen(id));
  };

  const closeById = (id: string) => {
    const modals = modalStore.getState().modals;
    if (modals.findIndex((m) => m.id === id) === -1) {
      return;
    }
    setModals(updateToClose(id));
  };

  useEffect(() => {
    createModal({
      id: 'cannot-access',
      header: (
        <div className="w-full flex justify-center">
          <Typo size={20} bold>
            서비스 접근 제한 지역
          </Typo>
        </div>
      ),
      node: () => (
        <div className="col">
          <Typo size={14} bold>
            한밭대학교 지역이 아니므로 서비스에 접근할 수 없습니다 😱
          </Typo>
          <Typo size={14} bold>
            교내 지역에서 다시 접근해주세요 🥹
          </Typo>
        </div>
      ),
    });

    createModal({
      id: 'download-complete',
      header: (
        <div className="w-full flex">
          <Typo size={20} bold>
            완료
          </Typo>
        </div>
      ),
      node: () => (
        <div className="col">
          <Typo size={14} bold>
            다운로드가 완료되었습니다!
          </Typo>
        </div>
      ),
    });
  }, []);

  return (
    <ModalContext.Provider value={{ modals, createModal, closeById, openById }}>
      {isOpenAnyModal && <Dimmed />}
      {modals
        .filter((m) => m.open)
        .map((modal) => (
          <Modal key={modal.id} {...modal} />
        ))}
      {children}
    </ModalContext.Provider>
  );
};

const checkExists = (id: string) => {
  const modals = modalStore.getState().modals;
  return modals.findIndex((m) => m.id === id) !== -1;
};

const generateId = () => nanoid(3);
const update = (id: string, fragmentation: boolean) => {
  const modals = modalStore.getState().modals;
  return modals.map((modal) => {
    if (modal.id === id) {
      return { ...modal, open: fragmentation };
    }
    return modal;
  });
};

const updateToOpen = (id: string) => update(id, true);
const updateToClose = (id: string) => update(id, false);

export default ModalProvider;
