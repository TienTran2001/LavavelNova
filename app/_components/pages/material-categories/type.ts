export interface ICategory {
  id: string;
  image: string;
  name: string;
  price_type: string;
}

export interface IDeleteCategory<T> {
  id: T;
  open: boolean;
  loading: boolean;
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

export interface IFormCategory {
  image?: File[];
  name: string;
  price_type: string;
}
