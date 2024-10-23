import React, { useState } from 'react';
import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import 'react-dropdown/style.css';
import clsx from 'clsx';

type DropdownOptions = {
  label: string;
  value: string;
};

type Props = ReactDropdownProps & {
  options: DropdownOptions[];
  onChange: (value: string) => void;
  defaultValue?: DropdownOptions;
};

export const Dropdown: React.FC<Props> = ({
  options,
  defaultValue,
  onChange,
  className,
  controlClassName,
  ...props
}) => {
  const [value, setValue] = useState<string | undefined>(
    () => defaultValue?.value,
  );

  const onChangeWrapper = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <ReactDropdown
      className={clsx([className])}
      controlClassName={clsx([
        '!border-[#E3E3E3] !rounded-[6px]',
        className,
        controlClassName,
      ])}
      placeholderClassName="!text-[#CACACA]"
      value={value}
      onChange={(option) => onChangeWrapper(option.value)}
      arrowClassName="!top-[19px]"
      options={options}
      {...props}
    />
  );
};
