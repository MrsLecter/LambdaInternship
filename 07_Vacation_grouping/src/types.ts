export type sheduleType = {
  [index: number]: shortedSheduleObject;
};

export type shortedSheduleObject = {
  userId: number;
  name: string;
  weekendDates: {
    startDate: string;
    endDate: string;
  }[];
};

export type vacationType = {
  startDate: string;
  endDate: string;
  user: {
    _id: number;
    name: string;
  };
};
