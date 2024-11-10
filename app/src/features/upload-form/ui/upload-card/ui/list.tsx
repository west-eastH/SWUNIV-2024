import React, { Dispatch, SetStateAction } from 'react';
import { UploadCard } from '@features/upload-form';
import { useFormContext } from 'react-hook-form';
import { BoxCreation } from '@entities/upload-box';
import { HbBox } from '@entities/hb-box';

type Props = {
  data: HbBox[];
  callback: Dispatch<SetStateAction<HbBox[]>>;
};

export const UploadFileList: React.FC<Props> = ({ data, callback }) => {
  const { setValue } = useFormContext<BoxCreation>();

  const remove = (file: HbBox) => {
    callback((prev) => {
      const results = prev.filter((f) => f.id !== file.id);
      setValue(
        'files',
        results.map((box) => box.origin),
      );
      return results;
    });
  };

  return (
    <div className="col gap-y-[8px]">
      {data.map((box) => (
        <UploadCard
          key={box.id}
          data={box.origin}
          onRemove={() => remove(box)}
        />
      ))}
    </div>
  );
};
