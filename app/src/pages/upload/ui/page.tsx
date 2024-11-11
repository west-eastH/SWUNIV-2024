import React, { useEffect, useState } from 'react';
import { Mobile } from '@features/layout';
import { Button, Icon, Typo, useModal } from '@shared/ui';
import {
  NameIndicator,
  NameUpdateButton,
  useNameManager,
} from '@features/nickname';
import {
  MetadataInputs,
  UploadFileList,
  useBoxUploadMutation,
  withValidation,
} from '@features/upload-form';
import { FileUpload } from '@widgets/file-upload';
import { useNavigate } from 'react-router';
import { urlPath } from '@app/config/router';
import { FormProvider, useForm } from 'react-hook-form';
import { fileUtils } from '@shared/utils';
import { BoxCreation } from '@entities/upload-box';
import { useLoading } from '@widgets/modal';
import { Unit } from '@widgets/file-upload/ui/capacity-meter';
import { generateBoxId, HbBox } from '@entities/hb-box';
import ga from 'react-ga4';
import { useAccessQuery } from '@features/access';
import { HelmetConfig } from '@features/analytics/TitleTracker';

const getFirstFileName = (files: File[]) => {
  if (files.length === 0) return;
  return files[0].name;
};

export const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<HbBox[]>([]);
  const navigate = useNavigate();
  const methods = useForm<BoxCreation>();
  const { createModal, openById } = useModal();
  const { nickname } = useNameManager();
  const { onLoading, finishLoading } = useLoading();
  const { mutateAsync } = useBoxUploadMutation();
  const { data } = useAccessQuery();
  const accessible = !!data?.accessible;

  const setFileFormStates = (files: HbBox[]) => {
    const data = files.map((f) => f.origin);
    methods.setValue('files', data);
  };

  const setTitle = (title?: string) =>
    title && methods.setValue('title', fileUtils.removeExt(title));

  const onUpload = (files: File[]) => {
    const newHbBoxes = files.map((f) => ({
      origin: f,
      id: generateBoxId(),
    }));

    const totalSize = files.reduce((prev, curr) => prev + curr.size, 0);
    if (totalSize > Unit.MAXIMUM) {
      return alert('파일 용량이 100MB 를 초과할 수 없습니다.');
    }

    const fillAutoTitle = (files: HbBox[]) => {
      if (methods.getValues('title')?.trim() !== '') {
        return;
      }
      setTitle(getFirstFileName(files.map((f) => f.origin)));
    };

    const callback = (prev: HbBox[]) => {
      const result = prev.concat(newHbBoxes);
      fillAutoTitle(result);
      setFileFormStates(result);
      return result;
    };

    setFiles(callback);
  };

  const onClickUploadButton = methods.handleSubmit(async (data) => {
    const assemble: BoxCreation = { ...data, uploader: nickname as string };
    withValidation(assemble, createModal, openById, async () => {
      try {
        onLoading();
        const id = await mutateAsync(assemble);
        navigate(urlPath.uploadComplete, { state: { id } });
      } catch (error) {
        console.error(error);
        openById('upload-failed');
      } finally {
        finishLoading();
        const size = assemble.files.reduce((prev, curr) => prev + curr.size, 0);
        ga.event({
          category: '리다이렉션',
          action: '파일 업로드 요청',
          label: `파일이름: ${assemble.title}, 업로더: ${assemble.uploader}), 사이즈: ${size}`,
        });
      }
    });
  });

  useEffect(() => {
    createModal({
      id: 'upload-failed',
      header: (
        <Typo size={16} bold>
          업로드 실패
        </Typo>
      ),
      node: () => (
        <Typo size={14}>
          현재 서버 통신이 잠시 원활하지 못했어요. 업로드를 다시 시도해주세요.
        </Typo>
      ),
    });

    createModal({
      id: 'redirect-home',
      header: (
        <div className="flex justify-center">
          <Typo size={20} color="red" bold>
            교외&nbsp;
          </Typo>
          <Typo size={20} color="black" bold>
            접근 안내
          </Typo>
        </div>
      ),
      node: ({ close }) => (
        <div className="col text-center">
          <Typo size={14}>교외 사용자는 업로드를 이용할 수 없습니다.</Typo>
          <Typo size={14}>
            관리자에게 문의하시거나 교내에서 다시 시도해주세요.
          </Typo>

          <Button
            className="mt-6"
            onClick={() => {
              navigate(urlPath.root);
              close();
            }}
          >
            네 확인했어요.
          </Button>
        </div>
      ),
      options: {
        onClose: () => navigate(urlPath.root),
        noContent: true,
      },
    });
  }, []);

  useEffect(() => {
    if (accessible) return;
    openById('redirect-home');
  }, [accessible]);

  return (
    <Mobile
      header={
        <Typo size={18} bold>
          파일 업로드
        </Typo>
      }
    >
      <HelmetConfig title="업로드" />
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
          <Button
            theme="white"
            className="flex-1"
            onClick={() => navigate(urlPath.root)}
          >
            업로드 취소
          </Button>
        </div>
      </FormProvider>
    </Mobile>
  );
};
