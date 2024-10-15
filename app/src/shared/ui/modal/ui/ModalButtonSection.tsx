import React, { ReactNode } from 'react';

type Props = { children: ReactNode };

export const ModalButtonSection: React.FC<Props> = ({ children }) => (
  <div className="flex gap-x-4 pt-[21px]">{children}</div>
);