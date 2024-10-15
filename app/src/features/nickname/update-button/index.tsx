import React from 'react';
import { Button } from '@shared/ui';
import { useNicknameChanger } from '@widgets/nickname-changer';

const NameUpdateButton: React.FC = () => {
  const openNicknameChanger = useNicknameChanger();

  return (
    <Button
      onClick={openNicknameChanger}
      theme="highlighted-white"
      className="px-[16px] h-[24px]"
      textSize={11}
    >
      이름 수정하기
    </Button>
  );
};

export default NameUpdateButton;