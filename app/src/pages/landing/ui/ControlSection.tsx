import React from 'react';
import { Button, Typo } from '@shared/ui';
import { useNameManager } from '@features/nickname';
import { useAccessible } from '@features/access';

export const ControlSection: React.FC = () => {
  const { generateNickname, changeNickname } = useNameManager();
  const access = useAccessible();

  const start = () => {
    const newNickname = generateNickname();
    changeNickname(newNickname);
  };

  const onClickStartButton = async () => {
    const accessible = await access();
    if (!accessible) return;
    start();
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
          한밭대학교 지역 내에서만 이용이 가능합니다.
        </Typo>
        <Typo size={14} color="gray">
          *모바일 기기에서는 교내 와이파이를 이용해주세요.
        </Typo>
      </div>
    </div>
  );
};
