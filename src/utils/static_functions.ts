export const reverseDateTime = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};
