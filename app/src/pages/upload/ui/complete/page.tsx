import React, { useEffect } from 'react';
import { Button, Icon, Typo, useModal } from '@shared/ui';
import { Mobile } from '@features/layout';
import { useLocation, useNavigate } from 'react-router';
import { urlPath } from '@app/config/router';
import { useBoxesQuery } from '@features/upload-box';
import WebDownloader from '@features/download';
import { HelmetConfig } from '@features/analytics/TitleTracker';

export const FileUploadCompletePage: React.FC = () => {
  const { createModal, openById } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    query: { refetch },
  } = useBoxesQuery();

  const onClickRedirectHome = () => {
    refetch();
    navigate(urlPath.root);
  };

  const onClickCopyButton = () => {
    const id = (location.state as { id: number })?.id;

    if (!id) {
      return alert('업로드 정보를 찾을 수 없습니다.');
    }

    const downloadUrl = WebDownloader.createDownloadLink(id);
    WebDownloader.copyOnDevice(downloadUrl, () => openById('copy-complete'));
  };

  useEffect(() => {
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
    <Mobile
      header={
        <Typo size={18} bold>
          파일 업로드
        </Typo>
      }
    >
      <HelmetConfig title="업로드 성공" />
      <div className="col all-center flex-1">
        <Icon.HbuDownload />
        <div className="pt-[33px]">
          <Typo size={24} color="red" bold>
            파일 업로드
          </Typo>
          <Typo size={24} bold>
            를 완료했어요!
          </Typo>
        </div>
        <Button
          theme="white"
          className="h-fit !py-[4px] !px-[12px] !font-medium mt-[12px]"
        >
          <Typo size={12} color="gray" onClick={onClickCopyButton}>
            다운로드 링크를 복사할래요.
          </Typo>
        </Button>
      </div>
      <div className="flex w-full justify-center">
        <Button
          icon={<Icon.HomeWhite />}
          className="h-[42px] mb-[26px] w-[176px]"
          textSize={14}
          onClick={onClickRedirectHome}
        >
          홈으로
        </Button>
      </div>
    </Mobile>
  );
};
