import React from 'react';
import UploadBox from '../card';
import { useBoxesQuery } from '@features/upload-box';
import ScrollEndObserver from '@features/ScrollEndObserver';

export const UploadBoxList: React.FC = () => {
  const {
    data: { boxes },
    getNextData,
  } = useBoxesQuery();

  return (
    <ScrollEndObserver onScrollEnd={getNextData}>
      <div className="flex flex-col gap-y-[8px] mb-[100px]">
        {boxes.map((box) => (
          <UploadBox key={box.id} data={box} />
        ))}
      </div>
    </ScrollEndObserver>
  );
};
