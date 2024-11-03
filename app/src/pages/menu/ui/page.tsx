import React from 'react';
import { Mobile } from '@features/layout';
import { MenuList } from '@widgets/menu-list';
import { Announcement } from './Announcement';

export const MenuHome: React.FC = () => {
  return (
    <Mobile header="header-logo">
      <article className="w-full h-full flex flex-col">
        <div className="flex-1">
          <MenuList
            title="기타 사항"
            menus={[
              {
                title: '문의하기',
                path: 'https://forms.gle/RNz1p56gFGnGCD8n6',
              },
              {
                title: '함께한 사람들',
                path: 'peopleWithin',
              },
            ]}
          />
        </div>

        <Announcement />
      </article>
    </Mobile>
  );
};