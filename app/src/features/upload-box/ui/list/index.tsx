import React from 'react';
import UploadBox from '../card';
import { useBoxesQuery } from '@features/upload-box';
import ScrollEndObserver from '@features/ScrollEndObserver';

export const UploadBoxList: React.FC = () => {
  const {
    data: { boxes },
    getNextData,
  } = useBoxesQuery();

  const test = () => {
    getNextData();
  };

  console.log({ boxes });

  return (
    <ScrollEndObserver onScrollEnd={test}>
      <div className="flex flex-col gap-y-[8px]">
        {boxes.map((box) => (
          <UploadBox key={box.id} data={box} />
        ))}
      </div>
    </ScrollEndObserver>
  );
};
