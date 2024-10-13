import React, { ChangeEvent, DragEvent, useRef } from 'react';
import { Icon, Typo } from "@shared/ui";

type Props = {
  onUpload: (files: File[]) => void;
}

export const UploadBox: React.FC<Props> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickFileOpener = () => inputRef.current?.click();

  const handleFileChangeEvent = (e: ChangeEvent<HTMLInputElement>) => Array.from(e.target?.files ?? []);
  const handleDropEvent = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    return Array.from(e.dataTransfer?.files ?? []);
  };

  return (
    <div
      onClick={onClickFileOpener}
      onDrop={e => onUpload(handleDropEvent(e))}
      onDragOver={e => e.preventDefault()}
      className="col all-center border-2 border-dashed border-light-gray rounded-[8px] h-[128px] cursor-pointer"
    >
      <div className="col all-center gap-y-[9px]">
        <Icon.GrayFile />
        <Typo size={14} className="!text-[#B0B7C8]" bold>업로드할 파일을 드래그하거나 화면을 터치하세요.</Typo>
      </div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={e => onUpload(handleFileChangeEvent(e))}
        multiple
      />
    </div>
  );
}
