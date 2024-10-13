import React, { useState } from 'react';
import { Mobile } from "@features/layout";
import { Button, Icon, Typo } from "@shared/ui";
import { NameIndicator, NameUpdateButton } from "@features/nickname";
import { MetadataInputs, UploadCard, UploadFileList } from "@features/upload-form";
import { FileUpload } from "@widgets/file-upload";

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onUpload = (files: File[]) => {
    setFiles(prev => prev.concat(files));
  };

  return (
    <Mobile
      header={<Typo size={18} bold>파일 업로드</Typo>}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <NameIndicator />
            <Typo size={11} color="light-gray">해당 이름으로 업로드됩니다.</Typo>
          </div>
          <NameUpdateButton />
        </div>
        <div className="border border-1 h-[1px] border-zinc-100 mt-[7px] mb-[19px]" />

      <div className="flex-1">
        <MetadataInputs />
        <FileUpload files={files} onUpload={onUpload} />
        <UploadFileList data={files} callback={setFiles} />
      </div>

      <div className="flex w-full all-center gap-x-[10px] self-end">
        <Button
          theme="primary"
          icon={<Icon.UploadWhite />}
          className="flex-1"
        >
          업로드
        </Button>
        <Button
          theme="white"
          className="flex-1"
        >
          업로드 취소
        </Button>
      </div>
    </Mobile>
  );
}

export default UploadPage;
