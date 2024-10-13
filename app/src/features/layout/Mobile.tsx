import React, { ReactElement, ReactNode } from 'react';
import { AppLayout } from "@shared/ui";
import Header, { HeaderType } from "./Header";
import GNB from "./GNB";

type Props = {
  children: ReactNode;
  header: HeaderType | ReactElement;
}

export const Mobile: React.FC<Props> = ({ header, children }) => {
  return (
    <AppLayout>
      <Header children={header} />
      <article className="flex flex-col flex-1 mb-[72px] flex-shrink-0">
        <article className="flex-1 h-full p-[16px]">
          {children}
        </article>
        <GNB />
      </article>

    </AppLayout>
  );
};
