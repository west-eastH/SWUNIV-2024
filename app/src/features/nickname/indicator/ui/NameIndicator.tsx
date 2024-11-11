import React from 'react';
import { useNameManager } from '../lib/useNameManager';
import { useAccessQuery } from '@features/access';
import { Typo } from '@shared/ui';

export const NameIndicator: React.FC = () => {
  const { nickname } = useNameManager();
  const { data } = useAccessQuery();
  const accessible = !!data?.accessible;

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Typo size={18} color="red" bold>
          {nickname}&nbsp;
        </Typo>
        <Typo size={18} bold>
          님
        </Typo>
      </div>

      {!accessible && (
        <Typo size={13} color="blue" className="mt-1.5">
          *현재 교외지역에서 서비스를 이용 중입니다.
        </Typo>
      )}
    </div>
  );
};
