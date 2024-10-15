import React, { ReactNode, useRef, useState } from 'react';
import ModalContext from '@shared/ui/modal/config/ModalContext';
import { Modal as ModalType, ModalContext as Context } from '../types';
import { nanoid } from 'nanoid';
import Modal from '../ui/Modal';
import { Dimmed } from '@shared/ui/modal/ui/Dimmed';

type Props = {
  children: ReactNode;
};

const generateId = () => nanoid(3);
const remove = (data: ModalType[], id: string) =>
  data.filter((d) => d.id !== id);

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const temps = useRef<ModalType[]>([]);

  const updateTemps = (modals: ModalType[]) => {
    temps.current = modals;
  };

  const getTemps = () => temps.current;

  console.log({ modals, temps });

  const createModal: Context['createModal'] = ({ node, header, options }) => {
    const newId = generateId();
    const newNode: ModalType = { id: newId, node, header, options };
    const concat = (origin: ModalType[]) => origin.concat(newNode);

    updateTemps(concat(getTemps()));

    const open = () => openById(newNode.id);
    const close = () => closeById(newNode.id);

    return [newId, open, close] as [
      id: string,
      open: () => void,
      close: () => void,
    ];
  };

  const openById = (id: string) => {
    const found = getTemps().find((r) => r.id === id);
    console.log({ tempInOpenFn: temps });

    if (!found) {
      throw new Error(`Apply Modal Not Found [ID: ${id}]`);
    }

    // updateTemps(remove(getTemps(), id));

    const concat = (origin: ModalType[]) => origin.concat(found);
    setModals(concat);
  };

  const closeById = (id: string) => {
    if (modals.findIndex((m) => m.id === id) === -1) {
      throw new Error(`Modal Not Found [ID: ${id}]`);
    }

    setModals((modals) => remove(modals, id));
  };

  return (
    <ModalContext.Provider value={{ modals, createModal, closeById, openById }}>
      {modals.length > 0 && <Dimmed />}
      {modals.map((modal) => (
        <Modal key={modal.id} {...modal} />
      ))}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;