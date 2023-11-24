/*
  Створіть функцію (isWeekend), яка приймає день тижня (з вашого enum)
  і повертає boolean значення, що вказує, чи це день робочий чи вихідний.
*/
enum Week {
  MON = "monday",
  TUE = "tuesday",
  WED = "wednesday",
  THU = "thursday",
  FRI = "friday",
  SAT = "saturday",
  SUN = "sunday",
}
const isWeekend = (day: Week): boolean => {
  return day === Week.SAT || day === Week.SUN;
};
