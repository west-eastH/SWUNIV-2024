import React from 'react';
import { Button, Typo } from "@shared/ui";

export const ControlSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <Button
          textSize={18}
          className="!rounded-[35px]"
        >
          로그인 없이 바로 시작하기
        </Button>
        <Typo size={14} color="gray" className="py-[15px]">한밭대학교 지역 내에서만 이용이 가능합니다.</Typo>
      </div>

    </div>
  );
};
