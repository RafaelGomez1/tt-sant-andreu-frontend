import { startOfWeek, getWeek, getYear, addWeeks, isSaturday, isBefore, startOfDay } from 'date-fns';

export const isTimeSlotCompleted = (timeSlot: string): boolean => {
  const now = new Date();
  const [hours, minutes] = timeSlot.split(':').map(Number);
  const slotDate = new Date();
  slotDate.setHours(hours, minutes);

  return now > slotDate;
};

export const getCurrentBookingWeek = (): { week: number; year: number } => {
  const today = new Date();
  
  // If it's Saturday, show next week's schedule
  if (isSaturday(today)) {
    const nextWeek = addWeeks(today, 1);
    return {
      week: getWeek(nextWeek),
      year: getYear(nextWeek)
    };
  }

  return {
    week: getWeek(today),
    year: getYear(today)
  };
};

export const isPastAgenda = (day: number, month: string): boolean => {
  const today = startOfDay(new Date());
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
  
  const agendaDate = new Date(new Date().getFullYear(), months.indexOf(month), day);
  return isBefore(agendaDate, today);
};