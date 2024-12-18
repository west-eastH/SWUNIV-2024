import { ReactElement, ReactNode } from 'react';

type NodeProps = {
  close: () => void;
};

export type Modal = {
  id: string;
  open: boolean;
  node: (p: NodeProps) => ReactNode;
  header?: ReactElement;
  options?: {
    noContent?: boolean;
    onConfirm?: () => void;
    confirmText?: string;
    onClose?: () => void;
  };
};

export type ModalContext = {
  modals: Modal[];
  closeById: (id: string) => void;
  openById: (id: string) => void;
  createModal: (props: Omit<Modal, 'open' | 'id'> & { id?: string }) => string;
};
