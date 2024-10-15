import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

type Input = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = Input & {};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className={clsx(['input-box', className])}>
        <input className="py-[10px] px-[15px] w-full" {...props} ref={ref} />
      </div>
    );
  },
);