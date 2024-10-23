import React from 'react';
import { UploadBoxDetails } from '@entities/upload-box';
import { Icon, Typo } from '@shared/ui';

type Props = Pick<UploadBoxDetails, 'uploader' | 'title'>;

const Details: React.FC<Props> = ({ uploader, title }) => {
  return (
    <div className="flex items-center gap-x-[8px]">
      <Icon.BlueFile />
      <div className="flex flex-col">
        <Typo size={14} bold>
          {title}
        </Typo>
        <div className="flex gap-x-1">
          <Typo size={11} color="gray" bold>
            업로더
          </Typo>
          <Typo size={11} color="light-blue" bold>
            {uploader}
          </Typo>
        </div>
      </div>
    </div>
  );
};

export default Details;
