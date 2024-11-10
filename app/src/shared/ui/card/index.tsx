import React, {
  ReactNode,
  DetailedHTMLProps,
  HTMLAttributes,
  useState,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { Button, Input, Typo, useModal } from '@shared/ui';
import { download } from '@features/upload-box';
import { useLoading } from '@widgets/modal';
import { useDeleteMutation } from '@features/upload-box/api/useDeleteMutation';
import WebDownloader from '@features/download';

type Props = { children: ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <article
      className={clsx([
        'w-full border-[2px] border-[#E3E3E3] bg-white drop-shadow-sm rounded-[12px]',
        className,
      ])}
      {...props}
    >
      {children}
    </article>
  );
};

export const DownloadHeader = () => (
  <div className="flex justify-center">
    <Typo size={20} color="red" bold>
      비밀번호
    </Typo>
    <Typo size={20} color="black" bold>
      를 입력하세요
    </Typo>
  </div>
);

type DownloadBodyProps = {
  id: number;
};

export const DownloadBody: React.FC<DownloadBodyProps> = ({ id }) => {
  const [password, setPassword] = useState('');
  const { createModal, openById, closeById } = useModal();
  const { onLoading, finishLoading } = useLoading();
  const { mutateAsync: deleteFile } = useDeleteMutation();

  const close = () => closeById(`download-${id}`);

  const onClickDownload = async () => {
    try {
      onLoading();
      const { blob, filename } = await download(id, password);
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = filename;
      anchor.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
      URL.revokeObjectURL(anchor.href);
      openById('download-complete');
    } catch (error) {
      console.log(error);
      openById('password-invalid-error');
    } finally {
      finishLoading();
      closeById(`download-${id}`);
    }
  };

  const onClickCopyDownloadLink = () => {
    const downloadUrl = WebDownloader.createDownloadLink(id);
    WebDownloader.copyOnDevice(downloadUrl, () => openById('copy-complete'));
  };

  const onClickDeleteFile = async () => {
    try {
      await deleteFile({ id, password });
      alert('삭제를 완료하였습니다!');
      closeById(`download-${id}`);
    } catch (e) {
      console.error(e);
      openById('password-invalid-error');
    }
  };

  useEffect(() => {
    createModal({
      id: 'password-invalid-error',
      node: () => (
        <div>
          <Typo size={14}>패스워드가 잘못되었습니다.</Typo>
        </div>
      ),
    });

    createModal({
      id: 'copy-complete',
      header: (
        <Typo size={16} bold>
          완료
        </Typo>
      ),
      node: () => <Typo size={14}>다운로드 링크를 복사하였습니다.</Typo>,
    });
  }, []);

  return (
    <div>
      <div className="flex gap-x-2">
        <Input
          placeholder="****"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          theme="white"
          className="px-10 w-[60px] py-1"
          onClick={onClickDeleteFile}
        >
          삭제
        </Button>
      </div>

      <div className="flex w-full justify-center py-2.5">
        <Button
          theme="white"
          className="!py-1"
          onClick={onClickCopyDownloadLink}
        >
          다운로드 링크 복사
        </Button>
      </div>

      <div className="mt-[20px] flex gap-x-2">
        <Button
          theme="primary"
          className="flex-[0.6] !px-[10px]"
          onClick={onClickDownload}
        >
          비밀번호 확인 후 다운로드
        </Button>
        <Button theme="white" className="flex-[0.4]" onClick={close}>
          닫기
        </Button>
      </div>
    </div>
  );
};
