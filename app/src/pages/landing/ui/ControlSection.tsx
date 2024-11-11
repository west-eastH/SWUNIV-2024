import React from 'react';
import { Button, Typo } from '@shared/ui';
import { useNameManager } from '@features/nickname';
import ga from 'react-ga4';

export const ControlSection: React.FC = () => {
  const { generateNickname, changeNickname } = useNameManager();

  const start = () => {
    const newNickname = generateNickname();
    changeNickname(newNickname);
  };

  const onClickStartButton = () => {
    start();
    ga.event({
      category: 'button',
      action: '서비스 이용 시작',
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <Button
          textSize={18}
          className="!rounded-[35px]"
          onClick={onClickStartButton}
        >
          로그인 없이 바로 시작하기
        </Button>
        <Typo size={14} color="gray" className="pt-[15px]">
          한밭대학교 지역 내에서만 정상 이용이 가능합니다.
        </Typo>
        <Typo size={14} color="gray">
          *모바일 기기에서는 교내 와이파이를 이용해주세요.
        </Typo>
      </div>
    </div>
  );
};
