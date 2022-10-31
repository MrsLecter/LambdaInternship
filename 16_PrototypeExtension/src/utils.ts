export const isExpectedElementType = (
  arr: Array<any>,
  type: string,
): boolean => {
  for (let item of arr) {
    if (typeof item !== type) {
      return false;
    }
  }
  return true;
};

export const ifIncludes = (arr: Array<any>, item: any): boolean => {
  for (let elem of arr) {
    if (elem === item) {
      return true;
    }
  }
  return false;
};
