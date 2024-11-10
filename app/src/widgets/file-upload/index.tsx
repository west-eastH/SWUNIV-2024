import React from 'react';
import { UploadBox } from './ui/box';
import { CapacityMeter } from './ui/capacity-meter';
import { Typo } from '@shared/ui';
import { HbBox } from '@entities/hb-box';

type Props = {
  files: HbBox[];
  onUpload: (files: File[]) => void;
};

export const FileUpload: React.FC<Props> = ({ onUpload, files }) => {
  const currentCapacity = files
    .map((f) => f.origin)
    .reduce((prev, cur) => prev + cur.size, 0);

  return (
    <article className="col gap-y-3">
      <div className="col gap-y-2 py-[24px]">
        <div className="flex gap-x-1">
          <Typo size={14} bold>
            파일 업로드
          </Typo>
          <Typo size={14} color="red" bold>
            *
          </Typo>
        </div>

        <UploadBox onUpload={onUpload} />
        <div />
        <CapacityMeter current={currentCapacity} />
      </div>
    </article>
  );
};
