import { createContext } from 'react';
import { ModalContext } from '@shared/ui/modal/types';

const ModalContext = createContext<ModalContext | undefined>(undefined);

export default ModalContext;