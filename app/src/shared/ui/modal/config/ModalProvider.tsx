import React, { ReactNode, useState } from 'react';
import ModalContext from '@shared/ui/modal/config/ModalContext';
import { Modal as ModalType, ModalContext as Context } from '../types';
import { nanoid } from 'nanoid';
import Modal from '../ui/Modal';
import { Dimmed } from '@shared/ui/modal/ui/Dimmed';

type Props = {
  children: ReactNode;
};

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const isOpenAnyModal = modals.some((modal) => modal.open);
  console.log({ modals, isOpenAnyModal });

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
    const concat = (origin: ModalType[]) => origin.concat(newNode);
    setModals(concat);

    return newId;
  };

  const openById = (id: string) => {
    console.log({ openByIdModals: modals });
    const found = modals.find((r) => r.id === id);

    if (!found) {
      throw new Error(`Apply Modal Not Found [ID: ${id}]`);
    }
    setModals((prev) => updateToOpen(prev, id));
  };

  const closeById = (id: string) => {
    if (modals.findIndex((m) => m.id === id) === -1) {
      return;
    }

    setModals((modals) => updateToClose(modals, id));
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
const update = (modals: ModalType[], id: string, fragmentation: boolean) =>
  modals.map((modal) => {
    if (modal.id === id) {
      return { ...modal, open: fragmentation };
    }
    return modal;
  });
const updateToOpen = (modals: ModalType[], id: string) =>
  update(modals, id, true);
const updateToClose = (modals: ModalType[], id: string) =>
  update(modals, id, false);

export default ModalProvider;
