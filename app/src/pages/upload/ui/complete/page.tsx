import React from 'react';
import { Button, Icon, Typo } from '@shared/ui';
import { Mobile } from '@features/layout';
import { useNavigate } from 'react-router';
import { urlPath } from '@app/config/router';

export const FileUploadCompletePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Mobile
      header={
        <Typo size={18} bold>
          파일 업로드
        </Typo>
      }
    >
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
          <Typo size={12} color="gray">
            다운로드 링크를 복사할래요.
          </Typo>
        </Button>
      </div>
      <div className="flex w-full justify-center">
        <Button
          icon={<Icon.HomeWhite />}
          className="h-[42px] mb-[26px] w-[176px]"
          textSize={14}
          onClick={() => navigate(urlPath.root)}
        >
          홈으로
        </Button>
      </div>
    </Mobile>
  );
};