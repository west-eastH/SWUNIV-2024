import React from 'react';
import { Dropdown, Input } from "@shared/ui";
import clsx from "clsx";

type Props = {} & Partial<Pick<HTMLElement, "className">>;
enum DropdownOptionKey {
  FILENAME = "filename",
  UPLOADER = "uploader",
}

const dropdownOptions = [
  { value: DropdownOptionKey.FILENAME, label: "파일명" },
  { value: DropdownOptionKey.UPLOADER, label: "닉네임" },
];

export const Search: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx([
      'mt-[18px] mb-[24px]',
      'flex gap-x-3 w-full',
      className,
    ])}>
      <Input placeholder="기업과 창업.pdf" className="w-full" />
      <Dropdown
        options={dropdownOptions}
        placeholder="구분"
        className="h-[46px] w-[120px]"
        onChange={console.log}
      />
    </div>
  );
};
