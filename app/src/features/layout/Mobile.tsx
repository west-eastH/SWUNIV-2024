import React, { ReactElement, ReactNode } from 'react';
import { AppLayout } from '@shared/ui';
import Header, { HeaderType } from './Header';
import GNB from './GNB';
import { Outlet } from 'react-router';

type Props = {
  children: ReactNode;
  header: HeaderType | ReactElement;
};

export const Mobile: React.FC<Props> = ({ header, children }) => {
  return (
    <>
      <Outlet />
      <AppLayout>
        <Header children={header} />
        <article className="flex flex-col flex-1 flex-shrink-0">
          <article className="col flex-1 h-full p-[16px]">{children}</article>
          <GNB />
        </article>
      </AppLayout>
    </>
  );
};