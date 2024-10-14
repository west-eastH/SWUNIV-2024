import React, { ReactElement } from 'react';
import { Icon } from "@shared/ui";

export type HeaderType = "header-logo";

type Props = { children: HeaderType | ReactElement; }

const headerMap: Record<HeaderType, ReactElement> = {
  "header-logo": <Icon.HeaderLogo />,
};

const Header: React.FC<Props> = ({ children }) => {
  const isHeaderType = typeof children === "string";
  const header = headerMap[children as HeaderType];

  return (
    <header className="h-[56px] py-[8px] flex justify-center items-center border-b border-[#F4F4F4]">
      {isHeaderType && header}
      {!isHeaderType && children}
    </header>
  );
}

export default Header;

