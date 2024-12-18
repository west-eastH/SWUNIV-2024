import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export type Color =
  | 'red'
  | 'yellow'
  | 'blue'
  | 'light-blue'
  | 'text'
  | 'white'
  | 'gray'
  | 'sub'
  | 'light-gray'
  | 'black';

export type TypoProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  size: number;
  color?: Color;
  bold?: boolean;
};

export const Typo = forwardRef<HTMLSpanElement, TypoProps>(
  (
    { children, size, bold = false, color = 'black', className, ...props },
    ref,
  ) => {
    return (
      <span
        className={clsx([
          colorMap[color as Color],
          bold && 'font-bold',
          className,
        ])}
        style={{
          fontSize: size,
        }}
        {...props}
        ref={ref}
      >
        {children}
      </span>
    );
  },
);

const colorMap: Record<Color, string> = {
  black: 'text-[#292D32]',
  red: 'text-hb-red',
  yellow: 'text-hb-yellow',
  blue: 'text-hb-blue',
  text: 'text-text',
  gray: 'text-gray',
  sub: 'text-slate-700',
  'light-gray': 'text-light-gray',
  'light-blue': 'text-hb-light-blue',
  white: 'text-white',
};
