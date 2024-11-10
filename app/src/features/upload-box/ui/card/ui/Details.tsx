import React from 'react';
import { UploadBoxDetails } from '@entities/upload-box';
import { Icon, Typo } from '@shared/ui';
import { getUnit, Unit } from '@widgets/file-upload/ui/capacity-meter';
import { createAdjustedDeviceTitle } from '@features/upload-box/utils';

type Props = Pick<UploadBoxDetails, 'uploader' | 'title' | 'fileSize'>;

const Details: React.FC<Props> = ({ uploader, title, fileSize }) => {
  const size = getUnit(fileSize, Unit.MB);

  return (
    <div className="flex items-center gap-x-[8px]">
      <Icon.BlueFile />
      <div className="flex flex-col overflow-hidden">
        <div className="flex gap-x-1.5">
          <Typo size={14} bold>
            {createAdjustedDeviceTitle(title)}
          </Typo>
          <Typo
            size={10}
            color="light-gray"
            className="self-end pb-[2px] whitespace-pre-wrap"
            bold
          >
            {size}MB
          </Typo>
        </div>

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
