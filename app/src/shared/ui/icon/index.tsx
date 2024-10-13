import HomeDeActive from "@shared/assets/icon/home_deactive.svg?react"
import HomeActive from "@shared/assets/icon/home_active.svg?react"
import UploadActive from "@shared/assets/icon/upload_active.svg?react"
import UploadDeActive from "@shared/assets/icon/upload_deactive.svg?react"
import MenuActive from "@shared/assets/icon/menu_active.svg?react";
import MenuDeActive from "@shared/assets/icon/menu_deactive.svg?react";
import HeaderLogo from "@shared/assets/icon/header-logo.svg?react";
import UploadWhite from "@shared/assets/icon/upload-white.svg?react";
import BlueFile from "@shared/assets/icon/file.svg?react";
import GrayFile from "@shared/assets/icon/gray-file.svg?react";

export const Icon = {
  GNB: {
    Home: {
      DeActive: HomeDeActive,
      Active: HomeActive,
    },
    Upload: {
      DeActive: UploadDeActive,
      Active: UploadActive,
    },
    Menu: {
      DeActive: MenuDeActive,
      Active: MenuActive,
    },
  },
  HeaderLogo,
  UploadWhite,
  BlueFile,
  GrayFile,
};
