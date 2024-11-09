import React, { useEffect } from 'react';
import { UploadBoxDetails } from '@entities/upload-box';
import { Card, DownloadBody, DownloadHeader, useModal } from '@shared/ui';
import Details from './ui/Details';
import Time from './ui/Time';

type Props = {
  data: UploadBoxDetails;
};

const UploadBox: React.FC<Props> = ({ data }) => {
  const { dateUploaded, title, uploader } = data;
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

  const onClickDownload = () => openById(`download-${data.id}`);

  return (
    <Card className="card" onClick={onClickDownload}>
      <Details uploader={uploader} title={title} />
      <Time dateUploaded={dateUploaded} />
    </Card>
  );
};

export default UploadBox;
