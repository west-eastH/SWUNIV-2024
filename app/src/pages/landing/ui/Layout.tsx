import { ReactNode, FC } from 'react';

type Props = { children: ReactNode; }

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
