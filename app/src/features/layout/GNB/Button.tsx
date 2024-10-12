import React, { ReactElement } from 'react';
import { Icon, Typo } from "@shared/ui";
import { urlPath } from "@app/config/router";
import { useLocation } from "react-router";

type GNBType = "home" | "upload" | "menu";

type Props = {
  type: GNBType;
}

type Option = {
  path: string;
  active: ReactElement;
  deActive: ReactElement;
  text: '홈' | '업로드' | '메뉴';
}

const gnbOptions: Record<GNBType, Option> = {
  home: {
    path: urlPath.root,
    active: <Icon.GNB.Home.Active />,
    deActive: <Icon.GNB.Home.DeActive />,
    text: "홈",
  },
  upload: {
    path: urlPath.upload,
    active: <Icon.GNB.Upload.Active />,
    deActive: <Icon.GNB.Upload.DeActive />,
    text: "업로드",
  },
  menu: {
    path: urlPath.menu,
    active: <Icon.GNB.Menu.Active />,
    deActive: <Icon.GNB.Menu.DeActive />,
    text: "메뉴",
  },
};

const Button: React.FC<Props> = ({ type }) => {
  const { pathname } = useLocation();
  const { active, deActive, text, path } = gnbOptions[type];
  const isActive = pathname === path;

  return (
    <button>
      {isActive && active}
      {!isActive && deActive}

      <Typo size={12} color={isActive ? "red" : "gray"}>{text}</Typo>
    </button>
  );
}

export default Button;
