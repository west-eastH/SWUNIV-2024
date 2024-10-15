import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <article className="fixed z-20 w-[100dvw] h-[100dvh] col all-center bg-none">
      <div className="relative w-[100dvw] h-[100dvh] col all-center bg-none">
        {children}
      </div>
    </article>
  );
};

export default Container;