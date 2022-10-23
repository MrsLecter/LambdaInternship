export type SheduleType = {
  [index: number]: ShortedSheduleObject;
};

export type ShortedSheduleObject = {
  userId: number;
  name: string;
  weekendDates: {
    startDate: string;
    endDate: string;
  }[];
};

export type VacationType = {
  startDate: string;
  endDate: string;
  user: {
    _id: number;
    name: string;
  };
};
