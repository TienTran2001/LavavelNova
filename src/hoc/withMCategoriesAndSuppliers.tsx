import { useEffect, useState } from 'react';
import { getAllMaterialCategoriesAPI } from '~/apis/materialCategories';
import { getSuppliersAPI } from '~/apis/supplier';
import { ICategory } from '~/pages/Dashboard/MaterialCategoriesPage/type';

interface ISuppliers {
  id: string;
  name: string;
}

export interface WithListMCSProps {
  categories: ICategory[];
  suppliers: ISuppliers[];
}

export default function withMaterialsAndSuppliers<T>(
  Component: React.ComponentType<T & WithListMCSProps>
) {
  return (props: T) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISuppliers[]>([]);

    // @fetch
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliersAPI();
        setSuppliers(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getAllMaterialCategoriesAPI();
        setCategories(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    // @effect
    useEffect(() => {
      fetchCategories();
      fetchSuppliers();
    }, []);

    return (
      <Component {...props} categories={categories} suppliers={suppliers} />
    );
  };
}
