export const getCurrencyList = (
  arr: { [currency: string]: string }[],
): string[] => {
  if (!arr.length) {
    return ["Nothing"];
  }
  let currency: string[] = [];
  arr.forEach((obj) => {
    currency.push(obj.currency);
  });
  return currency;
};

export const getStrinFromList = (list: string[]): string => {
  if (list[0] === "Nothing") {
    return "Your favourite list is empty!";
  }
  let str = "Your favourite currency: ";
  list.forEach((item) => {
    str += "\n/" + item;
  });
  return str;
};
