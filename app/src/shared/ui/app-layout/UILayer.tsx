import React, { ReactNode } from 'react';

type Props = { children: ReactNode; }

export const UILayer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full flex flex-col flex-shrink-0 md:w-[640px] bg-white">
        {children}
    </div>
  );
}
