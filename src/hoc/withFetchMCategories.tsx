// @ react
import { useEffect, useState } from 'react';

// @apis
import { getAllMaterialCategoriesAPI } from '~/apis/materialCategories';

// @components
import ErrorWithRetry from '~/components/Error/ErrorWithRetry';
import { ICategory } from '~/pages/Dashboard/MaterialCategoriesPage/type';

// @hooks
import { IError, useErrorHandler } from '~/hooks/useErrorHandler';

export interface WithMCategoriesProps {
  categories: ICategory[];
}

export default function withFetchMCategories<T>(
  Component: React.ComponentType<T & WithMCategoriesProps>
) {
  return (props: T) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    const { error, handleError, handleRetry } = useErrorHandler();

    // @fetch
    const fetchCategories = async () => {
      try {
        const response = await getAllMaterialCategoriesAPI();
        setCategories(response.data.results);
      } catch (err) {
        handleError(err as IError);
      }
    };

    // @effect
    useEffect(() => {
      fetchCategories();
    }, []);

    if (error) {
      return (
        <ErrorWithRetry
          variant="element"
          errorMessage={error}
          onRetry={() =>
            handleRetry(() => {
              fetchCategories();
            })
          }
        />
      );
    }

    return <Component {...props} categories={categories} />;
  };
}
