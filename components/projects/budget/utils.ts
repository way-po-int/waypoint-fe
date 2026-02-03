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
