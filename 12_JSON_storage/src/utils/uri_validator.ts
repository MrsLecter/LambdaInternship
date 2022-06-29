export const isValidParam = (rout: string): boolean => {
  const result = rout.match(/^[A-Za-z0-9]*$/);
  if (result === null) {
    return false;
  } else {
    return true;
  }
};
