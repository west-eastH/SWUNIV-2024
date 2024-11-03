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

type Props = { children: ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <article
      className={clsx([
        'w-full border border-1 border-[#E3E3E3] drop-shadow-sm rounded-[12px]',
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
  // const { onLoading, finishLoading } = useLoading();

  const close = () => closeById(`download-${id}`);

  const onClickDownload = async () => {
    try {
      const { blob, filename } = await download(id, password);
      closeById(`download-${id}`);
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = filename;

      anchor.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
      URL.revokeObjectURL(anchor.href);
    } catch (error) {
      console.log(error);
      openById('password-invalid-error');
    } finally {
      console.log('finally');
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
  }, []);

  return (
    <div>
      <Input
        placeholder="****"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
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
