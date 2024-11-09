import React, { useEffect } from 'react';
import { Mobile } from '@features/layout';
import DashboardPanel from '@widgets/dashboard-panel';
import { Search, UploadBoxList, useBoxesQuery } from '@features/upload-box';
import { DownloadBody, DownloadHeader, Typo, useModal } from '@shared/ui';
import { useSearchParams } from 'react-router-dom';
import { useNameManager } from '@features/nickname';

export const Home: React.FC = () => {
  const { data, isInitialFetch } = useBoxesQuery();
  const { createModal, openById } = useModal();
  const [searchParams] = useSearchParams();
  const { nickname, changeNickname, generateNickname } = useNameManager();

  if (!data) return null;

  useEffect(() => {
    if (!nickname) changeNickname(generateNickname());

    const id = searchParams.get('downloadId');
    if (!id) return;

    const downloadModalId = createModal({
      id: `download-${id}`,
      header: <DownloadHeader />,
      node: () => <DownloadBody id={Number(id)} />,
      options: {
        noContent: true,
      },
    });

    openById(downloadModalId);
  }, [searchParams]);

  return (
    <Mobile header="header-logo">
      <DashboardPanel />
      <Search />
      {isInitialFetch && (
        <div className="col items-center">
          <Typo size={14}>데이터가 존재하지 않습니다.</Typo>
        </div>
      )}
      {!isInitialFetch && <UploadBoxList />}
    </Mobile>
  );
};
