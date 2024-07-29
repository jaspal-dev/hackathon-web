import dayjs from "dayjs";

export const formatDate = (date) => {
  if (!date) return null;
  return dayjs(date).format("DD/MM/YYYY HH:MM A");
};

export const dayJSFormat = (date) => {
  if (!date) return null;
  return dayjs(date);
};
