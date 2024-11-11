import { Mobile } from '@features/layout';
import { ProfileCard } from '../ui/ProfileCard';
import { peopleConfig } from '@pages/within-people/config';
import { Button } from '@shared/ui';
import { useNavigate } from 'react-router';
import { urlPath } from '@app/config/router';
import { useEffect } from 'react';
import ga from 'react-ga4';
import { useNameManager } from '@features/nickname';

export const WithinPeople = () => {
  const navigate = useNavigate();
  const { nickname } = useNameManager();

  useEffect(() => {
    ga.event({
      category: '리다이렉션',
      action: '함께하는 사람들 페이지 접근',
      label: `[사용자명: ${nickname}]`,
    });
  }, []);

  return (
    <Mobile header="header-logo">
      <div className="col gap-y-14 py-14">
        <ProfileCard {...peopleConfig.manjong} />
        <ProfileCard {...peopleConfig.donghyeon} />
        <ProfileCard {...peopleConfig.eungi} />
      </div>
      <Button theme="white" onClick={() => navigate(urlPath.menu)}>
        뒤로가기
      </Button>
    </Mobile>
  );
};
