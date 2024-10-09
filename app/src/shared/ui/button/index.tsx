import React, { DetailsHTMLAttributes, ReactNode } from 'react';
import { Typo } from "@shared/ui";
import clsx from "clsx";

type Theme =  "primary" | "white" | "highlighted-white";

type Props = {
  icon?: ReactNode;
  theme?: Theme;
  textSize?: number;
} & DetailsHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ children, className, theme = "primary", icon, textSize = 14, ...props }) => {
  return (
    <button
      className={clsx([
        themeMap[theme],
        className,
      ])}
      {...props}
    >
      {icon && icon}
      <Typo color={getTypoColor(theme)} size={textSize} bold>{children}</Typo>
    </button>
  );
};

const getTypoColor = (buttonTheme: Theme) => buttonTheme === "primary" ? "white" : "gray";

const themeMap: Record<Theme, string> = {
  primary: "bg-hb-red py-[16px] px-[30px] drop-shadow-md rounded-[4px]",
  white: "bg-white border-[#E5E5E5] py-[16px] px-[30px] border-1 drop-shadow-md rounded-[4px]",
  "highlighted-white": "bg-white border-[#585858] border-1 drop-shadow-md rounded-[4px]",
};
