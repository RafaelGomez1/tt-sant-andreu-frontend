// Add the enabled property to the Agenda interface
export interface Agenda {
  id: string;
  day: {
    number: number;
    dayOfWeek: string;
  };
  month: string;
  week: number;
  year: number;
  availableHours: AvailableHour[];
  enabled: boolean;
}