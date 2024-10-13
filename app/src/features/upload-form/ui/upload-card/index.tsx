import React from 'react';
import { Button, Card, Typo } from "@shared/ui";

type Props = {
  data: File;
  onRemove: (data: File) => void;
}

export const UploadCard: React.FC<Props> = ({ data, onRemove }) => {
  return (
    <Card className="py-[12px] px-[10px] flex items-center justify-between">
      <Typo size={13} bold>{data.name}</Typo>
      <Button
        theme="outline-red"
        onClick={() => onRemove(data)}
      >
        삭제
      </Button>
    </Card>
  );
};

export { UploadFileList } from "./ui/list";