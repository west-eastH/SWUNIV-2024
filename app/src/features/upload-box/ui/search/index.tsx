import React, { ChangeEvent, useState } from 'react';
import { Dropdown, Input } from '@shared/ui';
import clsx from 'clsx';
import { useBoxesQuery } from '@features/upload-box';
import { Option } from 'react-dropdown';

type Props = {} & Partial<Pick<HTMLElement, 'className'>>;
enum DropdownOptionKey {
  FILENAME = 'title',
  UPLOADER = 'nickname',
}

const dropdownOptions = [
  { value: DropdownOptionKey.FILENAME, label: '파일명' },
  { value: DropdownOptionKey.UPLOADER, label: '닉네임' },
];

export const Search: React.FC<Props> = ({ className }) => {
  const { changeSearchType, keyword, onSearch } = useBoxesQuery();
  const [_keyword, _setKeyword] = useState(() => keyword);

  const onChangeSearchType = (option: string | Option) => {
    if (typeof option === 'string') {
      changeSearchType(option as 'title' | 'nickname');
    }
  };

  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onSearch(value);
    _setKeyword(value);
  };

  return (
    <div
      className={clsx([
        'mt-[18px] mb-[24px]',
        'flex gap-x-3 w-full',
        className,
      ])}
    >
      <Input
        placeholder={'기업과 창업.pdf'}
        className="w-full"
        onChange={onChangeContent}
        value={_keyword}
      />
      <Dropdown
        defaultValue={dropdownOptions[0]}
        options={dropdownOptions}
        placeholder="구분"
        className="h-[46px] w-[120px]"
        onChange={onChangeSearchType}
      />
    </div>
  );
};
