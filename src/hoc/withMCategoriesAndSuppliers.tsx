import { useEffect, useState } from 'react';
import { getAllMaterialCategoriesAPI } from '~/apis/materialCategories';
import { getSuppliersAPI } from '~/apis/supplier';
import ErrorWithRetry from '~/components/Error/ErrorWithRetry';
import { ICategory } from '~/pages/Dashboard/MaterialCategoriesPage/type';

interface ISuppliers {
  id: string;
  name: string;
}

interface IError {
  message?: string;
}

export interface WithListMCSProps {
  categories: ICategory[];
  suppliers: ISuppliers[];
}

export default function withMaterialsAndSuppliers<T>(
  Component: React.ComponentType<T & WithListMCSProps>
) {
  return (props: T) => {
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [suppliers, setSuppliers] = useState<ISuppliers[]>([]);

    // @fetch
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliersAPI();
        setSuppliers(response.data.results);
      } catch (err) {
        const errorResponse = err as IError;
        setError(errorResponse?.message || 'Error!!!');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getAllMaterialCategoriesAPI();
        setCategories(response.data.results);
      } catch (err) {
        const errorResponse = err as IError;
        setError(errorResponse?.message || 'Error!!!');
      }
    };

    const handleRetry = () => {
      setError(null);
      fetchCategories();
      fetchSuppliers();
    };

    // @effect
    useEffect(() => {
      console.log('vào nè ');

      fetchCategories();
      fetchSuppliers();
    }, []);

    if (error) {
      return <ErrorWithRetry errorMessage={error} onRetry={handleRetry} />;
    }

    return (
      <Component {...props} categories={categories} suppliers={suppliers} />
    );
  };
}
