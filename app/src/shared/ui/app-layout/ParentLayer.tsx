import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

export const ParentLayer: React.FC<Props> = ({ children }) => {
  return (
    <main className="w-full bg-slate-100 h-[100vh] flex justify-center">
        {children}
    </main>
  );
}
