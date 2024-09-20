const calculateItemIndexInTable = (
  index: number,
  limit: number,
  page: number
) => {
  return index + 1 + limit * (page - 1);
};

export default calculateItemIndexInTable;
