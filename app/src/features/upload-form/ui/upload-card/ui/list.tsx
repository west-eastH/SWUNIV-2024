import React, { Dispatch, SetStateAction } from 'react';
import { UploadCard } from '@features/upload-form';
import { useFormContext } from 'react-hook-form';
import { UploadCreation } from '@features/upload-form/types';

type Props = {
  data: File[];
  callback: Dispatch<SetStateAction<File[]>>;
};

export const UploadFileList: React.FC<Props> = ({ data, callback }) => {
  const { setValue } = useFormContext<UploadCreation>();

  const remove = (file: File) => {
    callback((prev) => {
      const results = prev.filter((f) => f.name !== file.name);
      setValue('files', results);
      return results;
    });
  };

  return (
    <div className="col gap-y-[8px]">
      {data.map((file) => (
        <UploadCard key={file.name} data={file} onRemove={() => remove(file)} />
      ))}
    </div>
  );
};