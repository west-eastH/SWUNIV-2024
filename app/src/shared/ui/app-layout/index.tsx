import React, { ReactNode } from 'react';
import { ParentLayer } from "./ParentLayer";
import { UILayer } from "./UILayer";

type Props = {
  children: ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <ParentLayer>
      <UILayer>
        {children}
      </UILayer>
    </ParentLayer>
  );
};
