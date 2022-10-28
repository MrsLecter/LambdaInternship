export const getCurrentCurrencyQuery = (currency: string, date: Date) => {
  const timestamp = date.toJSON().slice(0, 19).replace("T", " ");
  return `SELECT ${currency} FROM currency WHERE timestamp > '${timestamp}';`;
};

export const getAllFromPeriodQuery = (date: Date) => {
  const timestamp = date.toJSON().slice(0, 19).replace("T", " ");
  return `SELECT * FROM currency WHERE timestamp > '${timestamp}';`;
};
