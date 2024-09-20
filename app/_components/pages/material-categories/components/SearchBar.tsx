'use client';

import InputSearch from '@/app/_components/ui/input/search/InputSearch';
import KeyWordList, {
  IKeyword,
} from '@/app/_components/ui/keyword/KeyWordList';
import { useSearchQuery } from '@/app/_hooks';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

interface SearchFormValues {
  name: string;
  category: string;
}

const keywordList: IKeyword[] = [
  {
    name: 'name',
    label: 'name',
    query: 'name',
  },
];

const SearchBar = () => {
  const { control, handleSubmit, watch, reset, resetField, getValues } =
    useForm<SearchFormValues>({
      defaultValues: {
        name: useSearchQuery('name').searchQuery,
        category: useSearchQuery('category').searchQuery,
      },
    });

  const router = useRouter();

  const onSubmit = (data: SearchFormValues) => {
    console.log(data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== '')
    );
    const queryParams = new URLSearchParams(filteredData).toString();
    router.push(`?${queryParams}`);
  };
  const values = watch(['name', 'category']);
  const hasData = values.some((value) => value !== '');

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex items-center gap-x-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputSearch
                field={field}
                placeholder="Search name..."
                className="shadow-sm"
                query="q"
              />
            )}
          />
          <button className="invisible opacity-0 " type="submit"></button>
        </Box>
      </form>
      {hasData && (
        <KeyWordList
          keywordList={keywordList}
          getValues={getValues}
          reset={reset}
          resetField={resetField}
          resetValues={{ name: '', category: '' }}
        />
      )}
    </div>
  );
};

export default SearchBar;
