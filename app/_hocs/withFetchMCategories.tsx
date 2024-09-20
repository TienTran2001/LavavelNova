'use client';

import { getAllMaterialCategoriesAPI } from '@/app/_api/materialCategories';
import ErrorWithRetry from '@/app/_components/ui/error/ErrorWithRetry';
import { IError, useErrorHandler } from '@/app/_hooks/useErrorHandler';
import { useEffect, useState } from 'react';

interface ICategory {
  id: string;
  image: string;
  name: string;
  price_type: string;
}

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
        if (number === 4) {
          throw new Error('hehe');
        }
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
