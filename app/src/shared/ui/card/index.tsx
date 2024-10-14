import React, { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from "clsx";

type Props = { children: ReactNode; } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <article className={clsx([
      "w-full border border-1 border-[#E3E3E3] drop-shadow-sm rounded-[12px]",
      className,
    ])} {...props}>
      {children}
    </article>
  );
};
