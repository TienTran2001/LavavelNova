'use client';

import SearchAutoComplete from '@/app/_components/ui/input/search/SearchAutoComplete';
import withFetchMCategories, {
  WithMCategoriesProps,
} from '@/app/_hocs/withFetchMCategories';

interface IProps {
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const SearchCategory = withFetchMCategories(
  ({ categories, field }: WithMCategoriesProps & IProps) => {
    return (
      <SearchAutoComplete
        field={field}
        options={categories}
        displayKey="name"
      />
    );
  }
);

export default SearchCategory;
