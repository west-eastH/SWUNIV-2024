import React from 'react';
import { Typo } from '@shared/ui';

export const Announcement: React.FC = () => {
  return (
    <article className="w-full gray-bg p-[17px] rounded-lg flex flex-col">
      <Typo size={12} color="gray" className="min-w-[200px] max-w-[260px]">
        해당 서비스는 학생, 학교 관계자 간 학업, 비즈니스 편의를 위해 운영 중
        이므로 악의적인 파일 업로드, 다운로드 수행을 금합니다.
      </Typo>

      <Typo size={12} color="gray" className="pt-3">
        한밭대학교 지역 내에서만 서비스 이용이 가능한 점 참고바랍니다.
      </Typo>

      <Typo size={12} color="gray" className="pt-3">
        서비스 담당자: 최은기(deveungi@gmail.com)
      </Typo>
    </article>
  );
};
