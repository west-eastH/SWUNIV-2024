import React, { ReactNode, useState } from 'react';
import ModalContext from '@shared/ui/modal/config/ModalContext';
import { Modal as ModalType, ModalContext as Context } from '../types';
import { nanoid } from 'nanoid';
import Modal from '../ui/Modal';
import { Dimmed } from '@shared/ui/modal/ui/Dimmed';
import { create } from 'zustand/react';

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
  console.debug({ modals });

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

const checkExists = (id: string, modals: ModalType[]) =>
  modals.findIndex((m) => m.id === id) !== -1;

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
