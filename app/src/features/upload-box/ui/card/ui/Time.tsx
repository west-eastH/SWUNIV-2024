import React from 'react';
import { UploadBoxDetails } from "@entities/upload-box";
import { getDateDetails } from "../lib/date";
import { Typo } from "@shared/ui";

type Props = Pick<UploadBoxDetails, "dateUploaded">

const Time: React.FC<Props> = ({ dateUploaded }) => {
  const { timePoint, date, isAM, hours } = getDateDetails(dateUploaded);

  return (
    <div className="flex flex-col leading-4">
      <Typo size={14} color={isAM ? "yellow" : "red"} bold>{timePoint} {hours}</Typo>
      <Typo size={12} color="light-gray" bold>업로드 됨</Typo>
      <Typo size={12} color="light-blue" bold>{date}</Typo>
    </div>
  );
}

export default Time;
