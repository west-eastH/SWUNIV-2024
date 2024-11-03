import React from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '@shared/ui';

type ListMenu = {
  title: string;
  path: string;
};

type ListProps = {
  title: string;
  menus: ListMenu[];
};

export const MenuList: React.FC<ListProps> = ({ title, menus }) => {
  const navigate = useNavigate();

  const navigateUrl = (path: string) => {
    if (path.includes('form')) {
      window.open(path);
      return;
    }

    navigate(path);
  };

  return (
    <nav className="flex flex-col">
      <h3 className="text-[18px] font-bold text-text py-[20px]">{title}</h3>
      <ul className="flex flex-col gap-y-3">
        {menus.map(({ title, path }) => (
          <li
            key={path}
            className="flex w-full justify-between cursor-pointer"
            onClick={() => navigateUrl(path)}
          >
            <span className="text-text">{title}</span>
            <Icon.BlueArrow />
          </li>
        ))}
      </ul>
    </nav>
  );
};
