import SearchAutoComplete from '~/components/Input/search/SearchAutoComplete';
import withFetchMCategories, {
  WithMCategoriesProps,
} from '~/hoc/withFetchMCategories';

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
