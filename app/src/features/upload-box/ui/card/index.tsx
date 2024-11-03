import React, { useEffect } from 'react';
import { UploadBoxDetails } from '@entities/upload-box';
import { Card, DownloadBody, DownloadHeader, Typo, useModal } from '@shared/ui';
import Details from './ui/Details';
import Time from './ui/Time';
import { download } from '@features/upload-box';

type Props = {
  data: UploadBoxDetails;
};

const UploadBox: React.FC<Props> = ({ data }) => {
  const { dateUploaded, title, uploader, id } = data;
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

  const onClickDownload = async () => {
    openById(`download-${data.id}`);
    // const { blob, filename } = await download(id);
    // console.log({ blob, filename });
    // const anchor = document.createElement('a');
    // anchor.href = URL.createObjectURL(blob);
    // anchor.download = filename;
    //
    // anchor.dispatchEvent(
    //   new MouseEvent('click', { bubbles: true, cancelable: true }),
    // );
    //
    // URL.revokeObjectURL(anchor.href);
  };

  return (
    <Card
      className="py-[14px] px-[20px] flex justify-between"
      onClick={onClickDownload}
    >
      <Details uploader={uploader} title={title} />
      <Time dateUploaded={dateUploaded} />
    </Card>
  );
};

export default UploadBox;
