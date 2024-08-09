export const priceType = {
  quantity: {
    display: 'Quantity',
    value: 'per_quantity',
  },
  metter: {
    display: 'Metter',
    value: 'per_metter',
  },
};

export const calculateItemIndexInTable = (
  index: number,
  limit: number,
  page: number
) => {
  return index + 1 + limit * (page - 1);
};

export const urlToFile = async (
  url: string,
  filename: string
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};
