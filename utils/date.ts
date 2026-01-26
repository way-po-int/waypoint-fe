const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const calculateTravelDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / MS_PER_DAY);
  const nights = diffDays;
  const days = diffDays + 1;

  if (nights === 0) return "당일치기";

  return `${nights}박 ${days}일 여행`;
};
