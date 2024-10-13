import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { palette } from "@shared/style";
import { Typo } from "@shared/ui";

type Props = {
  current: number;
}

enum Unit {
  KB = 1024,
  MB = Unit.KB * 1024,
  GB = Unit.MB * 1024,
  MAXIMUM = Unit.GB * 2,
}

const getUnit = (num: number, unit: Unit) => {
  const mainUnit = Math.floor(num / unit);
  const remainingUnit = (num % unit) / unit;
  console.log({ mainUnit, remainingUnit });

  return (mainUnit + remainingUnit).toFixed(2);
};

const getCapacity = (size: number) => {
  console.log({ size })
  if (size >= Unit.MB && size < Unit.GB) {
    return getUnit(size, Unit.MB);
  }

  if (size >= Unit.GB) {
    return getUnit(size, Unit.GB);
  }

  return (Number(getUnit(size, Unit.KB)) / 10).toFixed(2);
};

const getProgress = (capacity: number) => {
  if (capacity > Unit.MAXIMUM) return 100;
  const result = (capacity / Unit.MAXIMUM) * 100;
  return result.toFixed(2);
};

export const CapacityMeter: React.FC<Props> = ({ current }) => {
  const indicator = (() => {
    const capacity = Number(getCapacity(current));
    return current >= Unit.GB ? `${capacity}GB` : `${capacity}MB`;
  })();

  const completed = getProgress(current);

  return (
    <div className="col">
      <ProgressBar
        completed={completed}
        height="9px"
        bgColor={palette["hb-light-blue"]}
        baseBgColor="#B0B7C8"
        borderRadius="35px"
        isLabelVisible={false}
      />
      <div className="flex gap-x-1 self-end mr-[5px] py-1.5">
        <Typo size={11} color="light-gray" bold>제한 용량</Typo>
        <div className="flex all-center gap-x-1.5">
          <Typo size={11} color="light-blue" bold>{indicator}</Typo>
          <Typo size={11} color="light-blue" bold>/</Typo>
          <Typo size={11} color="light-blue" bold>2GB</Typo>
        </div>
      </div>

    </div>
  );
}
