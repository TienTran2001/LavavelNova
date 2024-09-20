export interface IMaterial {
  id: string;
  image?: string;
  large_title: string;
  name: string;
  part_number: string;
  basic_price: number;
  small_title: string;
  category: {
    id: string;
    image: string;
    name: string;
    price_type: string;
  };
  type?: number;
  supplier: {
    name: string;
  };
}

export interface IDataTableMaterial {
  count: number;
  materials: IMaterial[];
  loading: boolean;
}

export interface IFormMaterial {
  image?: File[];
  large_title: string;
  name?: string;
  type?: number;
  part_number: string;
  basic_price: number;
  small_title: string;
  category: string;
  supplier: string;
}

export interface IMaterialDetail {
  image: string;
  large_title: string;
  name?: string;
  type?: number;
  part_number: string;
  basic_price: number;
  small_title: string;
  category: string;
  supplier: string;
}
