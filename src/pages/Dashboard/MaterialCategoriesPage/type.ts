export interface ICategory {
  id: string;
  image: string;
  name: string;
  price_type: string;
}

export interface IDataTable {
  count: number;
  categories: ICategory[];
  loading: boolean;
}

export interface DataRow {
  id: number;
  image: string;
  name: string;
  price_type: string;
}

export interface HeadCellCategories {
  disablePadding: boolean;
  id?: keyof DataRow;
  label: string;
  numeric: boolean;
}
