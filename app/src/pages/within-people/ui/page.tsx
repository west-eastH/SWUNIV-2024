import { Mobile } from '@features/layout';
import { ProfileCard } from '../ui/ProfileCard';
import { peopleConfig } from '@pages/within-people/config';
import { Button } from '@shared/ui';
import { useNavigate } from 'react-router';
import { urlPath } from '@app/config/router';

export const WithinPeople = () => {
  const navigate = useNavigate();
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
