export const placeAmountMap: Record<string, number> = {
  "53": 7000,
  "54": 20000,
  "55": 15000,
  "56": 12000,
  "57": 10000,
  "58": 18000,
  "59": 8000,
  "60": 12000,
  "61": 9000,
  "62": 20000,
  "63": 15000,
  "64": 17000,
  "65": 8000,
};

export const formatCurrency = (value: number) =>
  `${value.toLocaleString("ko-KR")}원`;

export const sanitizeNumber = (value: string) => {
  const numeric = value.replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : 0;
};

/**
 * 입력값에서 숫자만 추출하여 반환
 * @param value - 입력된 문자열
 * @returns 숫자만 포함된 문자열
 */
export const extractNumbers = (value: string): string => {
  return value.replace(/[^\d]/g, "");
};

/**
 * 숫자를 천 단위 구분 쉼표가 있는 문자열로 변환
 * @param value - 숫자 또는 숫자 문자열
 * @returns 천 단위 구분 쉼표가 있는 문자열
 */
export const formatNumberWithCommas = (value: string | number): string => {
  const numericValue = typeof value === "string" ? sanitizeNumber(value) : value;
  return numericValue.toLocaleString("ko-KR");
};
