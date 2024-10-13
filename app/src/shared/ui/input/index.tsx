import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import clsx from "clsx";

type Input = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type Props = Input & {
}

export const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={clsx(["input-box pr-[15px]", className])}
    >
        <input
          className="py-[10px] pl-[15px] w-full"
          {...props}
        />
    </div>
  );
}
