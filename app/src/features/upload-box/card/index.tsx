import React from 'react';
import { UploadBoxDetails } from "@entities/upload-box";
import { Card } from "@shared/ui";
import Details from "./ui/Details";
import Time from "./ui/Time";

type Props = {
    data: UploadBoxDetails;
}

const UploadBox: React.FC<Props> = ({ data }) => {
  const { dateUploaded, title, uploader } = data;

  return (
    <Card className="py-[14px] px-[20px] flex justify-between">
      <Details uploader={uploader} title={title} />
      <Time dateUploaded={dateUploaded} />
    </Card>
  );
}

export default UploadBox;
