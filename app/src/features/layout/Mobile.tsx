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
      <article className="flex flex-col flex-1 flex-shrink-0">
        <article className="flex-1 p-[16px]">
          {children}
        </article>
        <GNB />
      </article>

    </AppLayout>
  );
};
