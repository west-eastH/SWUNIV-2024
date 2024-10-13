import React from 'react';
import { Button } from "@shared/ui";

type Props = {}

const NameUpdateButton: React.FC<Props> = () => {
  return (
    <Button theme="highlighted-white" className="px-[16px] h-[24px]" textSize={11}>
      이름 수정하기
    </Button>
  );
}

export default NameUpdateButton;
