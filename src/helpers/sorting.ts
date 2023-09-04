export const ascendingSort = (a: string | number, b: string | number) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const descendingSort = (a: string | number, b: string | number) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
};
