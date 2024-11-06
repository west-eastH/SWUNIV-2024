import React from 'react';
import { Input, Typo } from '@shared/ui';
import { useFormContext } from 'react-hook-form';
import { BoxCreation } from '@entities/upload-box';

export const MetadataInputs: React.FC = () => {
  const { register } = useFormContext<BoxCreation>();

  return (
    <div className="col gap-y-[24px]">
      <div className="col gap-y-1">
        <Typo size={14} bold>
          제목
        </Typo>
        <Input
          placeholder="캡스톤_3팀_자료분석 업로드"
          {...register('title')}
        />
        <Typo size={10} color="light-blue" className="self-end">
          * 제목 생략 시 첫 번째 파일명이 제목으로 업로드됩니다.
        </Typo>
      </div>
      <div className="col gap-y-1">
        <Typo size={14} bold>
          비밀번호
        </Typo>
        <Input type="password" placeholder="****" {...register('password')} />
      </div>
    </div>
  );
};
