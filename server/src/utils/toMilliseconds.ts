export const toMilliseconds = (hrs: number, min: number): number =>
  (hrs * 60 * 60 + min * 60) * 1000;
