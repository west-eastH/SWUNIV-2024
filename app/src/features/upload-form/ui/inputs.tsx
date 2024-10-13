import React from 'react';
import { Input, Typo } from "@shared/ui";

export const MetadataInputs: React.FC = () => {
  return (
    <div className="col gap-y-[24px]">
      <div className="col gap-y-1">
        <Typo size={14} bold>제목</Typo>
        <Input
          placeholder="캡스톤_3팀_자료분석 업로드"
        />
        <Typo size={10} color="light-blue" className="self-end">* 제목 생략 시 첫 번째 파일명이 제목으로 업로드됩니다.</Typo>
      </div>
      <div className="col gap-y-1">
        <Typo size={14} bold>비밀번호</Typo>
        <Input
          type="password"
          placeholder="****"
        />
        <Typo size={10} color="light-blue" className="self-end">* 비밀번호 생략 시 서비스 이용 지역 내에 자료가 모두 공개됩니다.</Typo>
      </div>
    </div>
  );
};
