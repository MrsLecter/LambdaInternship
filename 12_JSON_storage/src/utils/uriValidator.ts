export const isValidParam = (rout: string): boolean => {
  const result = rout.match(/^[A-Za-z0-9]*$/);
  if (!result) {
    return false;
  }
  return true;
};
