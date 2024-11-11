import React, { useEffect } from 'react';
import { UploadBoxDetails } from '@entities/upload-box';
import { Card, DownloadBody, DownloadHeader, useModal } from '@shared/ui';
import Details from './ui/Details';
import Time from './ui/Time';
import ga from 'react-ga4';

type Props = {
  data: UploadBoxDetails;
};

const UploadBox: React.FC<Props> = ({ data }) => {
  const { dateUploaded, title, uploader, fileSize } = data;
  const { createModal, openById } = useModal();

  useEffect(() => {
    createModal({
      id: 'download-' + String(data.id),
      header: <DownloadHeader />,
      node: () => <DownloadBody id={data.id} />,
      options: {
        noContent: true,
      },
    });
  }, []);

  const onClickDownload = () => {
    openById(`download-${data.id}`);
    ga.event({
      category: '상호작용',
      action: '박스 카드 터치',
      label: `[id: ${data.id}] ${data.title}`,
    });
  };

  return (
    <Card className="card" onClick={onClickDownload}>
      <Details uploader={uploader} title={title} fileSize={fileSize} />
      <Time dateUploaded={dateUploaded} />
    </Card>
  );
};

export default UploadBox;
