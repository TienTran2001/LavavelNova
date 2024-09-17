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

const randomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export default function withFetchMCategories<T>(
  Component: React.ComponentType<T & WithMCategoriesProps>
) {
  return (props: T) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    const { error, handleError } = useErrorHandler();

    // @fetch
    const fetchCategories = async () => {
      try {
        const number = randomNumber(2);
        if (number === 1) {
          throw new Error('hehe');
        }
        console.log('xuong');
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
          errorMessage={error}
          onRetry={() => {
            handleError(null);
            fetchCategories();
          }}
        />
      );
    }

    return <Component {...props} categories={categories} />;
  };
}
