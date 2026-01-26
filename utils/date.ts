import type { DateRange } from "react-day-picker";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * 로컬 시간 기준으로 날짜를 YYYY-MM-DD 형식으로 포맷팅합니다.
 * toISOString()은 UTC 기준이므로 한국 시간(UTC+9)에서는 날짜가 하루 전으로 나올 수 있어
 * 로컬 시간 기준으로 포맷팅하는 함수를 사용합니다.
 */
const formatDateToLocalString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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

export const formatDateRange = (from: Date, to: Date): string =>
  `${formatDateToLocalString(from)} ~ ${formatDateToLocalString(to)}`;

export const parseDateRange = (s: string): DateRange => {
  const [fromStr, toStr] = s.split(" ~ ").map((x) => x.trim());
  return {
    from: fromStr ? new Date(fromStr) : undefined,
    to: toStr ? new Date(toStr) : undefined,
  };
};
