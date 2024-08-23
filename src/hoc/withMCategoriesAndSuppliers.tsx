// @ react
import { useEffect, useState } from 'react';

// @apis
import { getAllMaterialCategoriesAPI } from '~/apis/materialCategories';
import { getSuppliersAPI } from '~/apis/supplier';

// @components
import ErrorWithRetry from '~/components/Error/ErrorWithRetry';
import { ICategory } from '~/pages/Dashboard/MaterialCategoriesPage/type';

// @hooks
import { IError, useErrorHandler } from '~/hooks/useErrorHandler';
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

    const { error, handleError, handleRetry } = useErrorHandler();

    // @fetch
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliersAPI();
        setSuppliers(response.data.results);
      } catch (err) {
        const errorResponse = err as IError;
        handleError(errorResponse);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getAllMaterialCategoriesAPI();
        setCategories(response.data.results);
      } catch (err) {
        const errorResponse = err as IError;
        handleError(errorResponse);
      }
    };

    // @effect
    useEffect(() => {
      fetchCategories();
      fetchSuppliers();
    }, []);

    if (error) {
      return (
        <ErrorWithRetry
          errorMessage={error}
          onRetry={() =>
            handleRetry(() => {
              fetchCategories();
              fetchSuppliers();
            })
          }
        />
      );
    }

    return (
      <Component {...props} categories={categories} suppliers={suppliers} />
    );
  };
}
