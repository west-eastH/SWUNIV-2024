import { useContext } from 'react';
import ModalContext from '../config/ModalContext';

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('ModalContext is undefined');
  }

  return context;
};

export default useModal;