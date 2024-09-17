import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// @mui
import Box from '@mui/material/Box';
import InputSearch from '~/components/Input/search/InputSearch';

// @components
import KeyWordList, { IKeyword } from '~/components/Keyword/KeyWordList';

// hooks
import useSearchQuery from '~/hooks/useSearchQuery';

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

  const navigate = useNavigate();

  const onSubmit = (data: SearchFormValues) => {
    console.log(data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== '')
    );
    const queryParams = new URLSearchParams(filteredData).toString();
    navigate(`?${queryParams}`);
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
