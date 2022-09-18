export const getCurrencyList = (
  arr: { [currency: string]: string }[],
): string[] => {
  if (arr.length === 0) {
    return ["Nothing"];
  }
  let currency: string[] = [];
  arr.forEach((obj) => {
    currency.push(obj["currency"]);
  });
  return currency;
};

export const getStrinFromList = (list: string[]): string => {
  if (list[0].localeCompare("Nothing") === 0) {
    return "Your favourite list is empty!";
  }
  let str = "Your favourite currency: ";
  list.forEach((item) => {
    str += "\n/" + item;
  });
  return str;
};
