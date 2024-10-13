import dayjs from "dayjs";

export const getDateDetails = (time: string) => {
  const day = dayjs(time);
  const timePoint = day.format("A");
  const isAM = timePoint === "AM";
  const isPM = timePoint === "PM";
  const date = day.format("MM. DD.");
  const hours = day.format("hh:mm");

  return {
    timePoint,
    isAM, isPM,
    date, hours,
  };
};
