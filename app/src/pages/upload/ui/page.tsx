import React, { useState } from 'react';
import { Mobile } from '@features/layout';
import { Button, Icon, Typo } from '@shared/ui';
import { NameIndicator, NameUpdateButton } from '@features/nickname';
import { MetadataInputs, UploadFileList } from '@features/upload-form';
import { FileUpload } from '@widgets/file-upload';
import { useNavigate } from 'react-router';
import { urlPath } from '@app/config/router';
import { FormProvider, useForm } from 'react-hook-form';
import { UploadCreation } from '@features/upload-form/types';
import { fileUtils } from '@shared/utils';

const getFirstFileName = (files: File[]) => {
  if (files.length === 0) return;
  return files[0].name;
};

export const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const methods = useForm<UploadCreation>();

  const setFileFormStates = (files: File[]) => methods.setValue('files', files);
  const setTitle = (title?: string) =>
    title && methods.setValue('title', fileUtils.removeExt(title));

  const onUpload = (files: File[]) => {
    const fillAutoTitle = (files: File[]) => setTitle(getFirstFileName(files));
    const callback = (prev: File[]) => {
      const result = prev.concat(files);
      fillAutoTitle(result);
      setFileFormStates(result);
      return result;
    };

    setFiles(callback);
  };

  const onClickUploadButton = methods.handleSubmit((data) => {
    console.log({ data });
    navigate(urlPath.uploadComplete);
  });

  return (
    <Mobile
      header={
        <Typo size={18} bold>
          파일 업로드
        </Typo>
      }
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <NameIndicator />
            <Typo size={11} color="light-gray">
              해당 이름으로 업로드됩니다.
            </Typo>
          </div>
          <NameUpdateButton />
        </div>
        <div className="border border-1 h-[1px] border-zinc-100 mt-[7px] mb-[19px]" />

        <div className="flex-1">
          <MetadataInputs />
          <FileUpload files={files} onUpload={onUpload} />
          <UploadFileList data={files} callback={setFiles} />
        </div>

        <div className="flex w-full all-center gap-x-[10px] self-end py-[23px]">
          <Button
            theme="primary"
            icon={<Icon.UploadWhite />}
            className="flex-1"
            onClick={onClickUploadButton}
          >
            업로드
          </Button>
          <Button theme="white" className="flex-1">
            업로드 취소
          </Button>
        </div>
      </FormProvider>
    </Mobile>
  );
};