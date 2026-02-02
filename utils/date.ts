import type { DateRange } from "react-day-picker";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** "YYYY-MM-DD" 정규식 */
const YMD_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * "YYYY-MM-DD" -> 로컬 자정 Date
 */
export const parseLocalDate = (dateStr: string): Date => {
  const match = YMD_RE.exec(dateStr);
  if (!match) throw new Error(`Invalid date format: ${dateStr}`);

  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);

  // 로컬 자정
  const date = new Date(y, m - 1, d);

  // 존재하지 않는 날짜(예: 2026-02-30) 방어
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    throw new Error(`Invalid calendar date: ${dateStr}`);
  }

  return date;
};

const startOfDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getNightAndDay = (startDate: string, endDate: string) => {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);

  const diffDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);

  return {
    nights: diffDays,
    days: diffDays + 1,
  };
};

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
  const { nights, days } = getNightAndDay(startDate, endDate);

  if (nights <= 0) return "당일치기";
  return `${nights}박 ${days}일 여행`;
};

export const formatDateRange = (from: Date, to: Date): string =>
  `${formatDateToLocalString(from)} ~ ${formatDateToLocalString(to)}`;

export const parseDateRange = (s: string): DateRange => {
  const [fromStr, toStr] = s.split(" ~ ").map((x) => x.trim());
  return {
    from: fromStr ? parseLocalDate(fromStr) : undefined,
    to: toStr ? parseLocalDate(toStr) : undefined,
  };
};

/**
 * 총 여행 기간을 일(day) 단위로 계산합니다.
 * 시작일과 종료일을 모두 포함한 일 수를 반환합니다.
 *
 * @example
 * getTotalTripDays("2026-01-01", "2026-01-01");
 * // → 1
 *
 * getTotalTripDays("2026-01-01", "2026-01-03");
 * // → 3
 */
export const getTotalTripDays = (startDate: string, endDate: string) => {
  return getNightAndDay(startDate, endDate).days;
};

/**
 * 오늘 날짜가 여행 기간에 포함되면 해당하는 DAY 인덱스를 반환합니다.
 * 포함되지 않으면 1을 반환합니다.
 *
 * @example
 * // 여행 중인 날이면
 * getInitialTripDay("2026-01-01", "2026-01-03") // (오늘이 "2026-01-02" 라면) → 2
 *
 * // 여행 기간 밖이면
 * getInitialTripDay("2026-01-10", "2026-01-12") // → 1
 */
export const getInitialTripDay = (startDate: string, endDate: string) => {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  const today = startOfDay(new Date());

  if (today.getTime() < start.getTime() || today.getTime() > end.getTime()) {
    return 1;
  }

  const diff = Math.round((today.getTime() - start.getTime()) / MS_PER_DAY);
  return diff + 1;
};
