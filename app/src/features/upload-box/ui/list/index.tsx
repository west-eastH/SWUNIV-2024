import React from 'react';
import UploadBox from '../card';
import { useBoxesQuery } from '@features/upload-box';
import ScrollEndObserver from '@features/ScrollEndObserver';
import { Typo } from '@shared/ui';

export const UploadBoxList: React.FC = () => {
  const {
    data: { boxes },
    getNextData,
    endOfPage,
  } = useBoxesQuery();

  return (
    <ScrollEndObserver onScrollEnd={getNextData}>
      <div className="flex flex-col gap-y-[8px] mb-[20px]">
        {boxes.map((box) => (
          <UploadBox key={box.id} data={box} />
        ))}
      </div>
      {endOfPage && (
        <div className="w-full flex justify-center">
          <Typo size={13} color="light-gray">
            모든 데이터를 불러왔습니다.
          </Typo>
        </div>
      )}
    </ScrollEndObserver>
  );
};
