import React from 'react';
import { Mobile } from '@features/layout';
import { MenuList } from '@widgets/menu-list';
import { Announcement } from './Announcement';
import { urlPath } from '@app/config/router';
import { HelmetConfig } from '@features/analytics/TitleTracker';

export const MenuHome: React.FC = () => {
  return (
    <Mobile header="header-logo">
      <HelmetConfig title="메뉴" />
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
                path: urlPath.peopleWithin,
              },
            ]}
          />
        </div>

        <Announcement />
      </article>
    </Mobile>
  );
};
