import React from 'react';
import { NameIndicator, useNameManager } from "@features/nickname";
import { Button, Icon } from "@shared/ui";

const DashboardPanel: React.FC = () => {
  const { exit } = useNameManager();

  return (
    <div className="w-full flex flex-col">
        <div className="w-full flex justify-between">
            <NameIndicator />
            <Button theme="highlighted-white" className="px-[16px]" textSize={11}>
                이름 수정하기
            </Button>
        </div>
      <div className="flex gap-x-[14px] py-[23px]">
        <Button
          icon={<Icon.UploadWhite />}
          textSize={14}
          className="flex-1 h-[42px]"
        >
          파일 공유하기
        </Button>
        <Button
          onClick={exit}
          theme="white"
          textSize={14}
          className="flex-1 h-[42px]"
        >
          이용 종료하기
        </Button>
      </div>

      <div className="border border-1 h-[1px] border-zinc-100" />
    </div>
  );
}

export default DashboardPanel;
