/**
 * "HH:mm" 형식의 시간 문자열을 분(minute) 단위의 숫자로 변환
 *  - 시(0~23), 분(0~59) 범위를 벗어나면 null
 *
 * @param time - "HH:mm" 형식의 시간 문자열 (예: "09:30")
 * @returns
 *  - 변환 성공 시: 자정(00:00) 기준 경과 분 (number)
 *  - 잘못된 값이거나 빈 값일 경우: null
 */
export const timeToMinutes = (time: string) => {
  if (!time) return null;

  const match = time.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;

  const h = Number(match[1]);
  const m = Number(match[2]);

  if (!Number.isInteger(h) || !Number.isInteger(m)) return null;
  if (h < 0 || h > 23) return null;
  if (m < 0 || m > 59) return null;

  return h * 60 + m;
};

/**
 * 종료 시간이 시작 시간보다 이후인지 검사
 *
 * @param startTime - 시작 시간 ("HH:mm")
 * @param endTime - 종료 시간 ("HH:mm")
 * @returns
 *  - 종료 시간이 시작 시간 이후이면 true
 *  - 시간이 같거나, 잘못된 값이 포함된 경우 false
 */
export const isEndAfterStart = (startTime: string, endTime: string) => {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  if (start === null || end === null) return false;

  return end > start;
};
