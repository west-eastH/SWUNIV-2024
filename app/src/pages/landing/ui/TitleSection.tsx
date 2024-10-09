import React from 'react';
import { Typo } from "@shared/ui";
import { TypingRotate } from "@features/typing-rotate";

export const TitleSection: React.FC = () => {
  return (
    <div className="flex flex-col pt-[50px] items-center mb-[60px]">
      <div className="flex">
        <Typo size={38} color="red" bold>한</Typo>
        <Typo size={38} color="yellow" bold>밭</Typo>
        &nbsp;&nbsp;
        <Typo size={38} color="light-blue" bold>BOX</Typo>
      </div>

      <div className="flex">
        <Typo size={24} color="light-gray" bold>한밭대에서 파일공유를 &nbsp;</Typo>
        <Typo size={24} color="light-blue" bold>더 쉽게.</Typo>
      </div>
    </div>
  );
};
