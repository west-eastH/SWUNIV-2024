import React from 'react';
import { UploadBoxDetails } from '@entities/upload-box';
import UploadBox from '../card';

type Props = {
  data: UploadBoxDetails[];
};

export const UploadBoxList: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-[8px] overflow-y-scroll">
      {data.map((box) => (
        <UploadBox key={box.id} data={box} />
      ))}
    </div>
  );
};
