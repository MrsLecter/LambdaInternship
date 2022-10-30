export const getCurrencyList = (
  arr: { [currency: string]: string }[],
): string[] => {
  if (!arr) {
    return ["Nothing"];
  }
  let currency: string[] = [];
  for (let obj of arr) {
    currency.push(obj.currency);
  }
  return currency;
};

export const getStrinFromList = (list: string[]): string => {
  if (list[0] === "Nothing") {
    return "Your favourite list is empty!";
  }
  let str = "Your favourite currency: ";
  for (let item of list) {
    str += "\n/" + item;
  }
  return str;
};
