import React, { Dispatch, SetStateAction } from 'react';
import { UploadCard } from "@features/upload-form";

type Props = {
  data: File[];
  callback: Dispatch<SetStateAction<File[]>>;
}

export const UploadFileList: React.FC<Props> = ({ data, callback }) => {
  return (
    <div className="col gap-y-[8px]">
      {data.map(file => <UploadCard
        key={file.name}
        data={file}
        onRemove={() => callback(prev => prev.filter(f => f.name !== file.name))}
      />)}
    </div>
  );
};
