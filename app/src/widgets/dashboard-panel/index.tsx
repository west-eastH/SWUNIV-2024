import React from 'react';
import { NameIndicator, NameUpdateButton, useNameManager } from "@features/nickname";
import { Button, Icon } from "@shared/ui";
import { useNavigate } from "react-router";
import { urlPath } from "@app/config/router";

const DashboardPanel: React.FC = () => {
  const { exit } = useNameManager();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          <NameIndicator />
          <NameUpdateButton />
        </div>
      <div className="flex gap-x-[14px] py-[23px]">
        <Button
          icon={<Icon.UploadWhite />}
          textSize={14}
          className="flex-1 h-[42px]"
          onClick={() => navigate(urlPath.upload)}
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
