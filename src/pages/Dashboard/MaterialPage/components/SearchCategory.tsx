import SearchAutoComplete from '~/components/Input/search/SearchAutoComplete';
import withFetchMCategories, {
  WithMCategoriesProps,
} from '~/hoc/withFetchMCategories';

const SearchCategory = withFetchMCategories(
  ({ categories }: WithMCategoriesProps) => {
    console.log(categories);
    return <SearchAutoComplete options={categories} displayKey="name" />;
  }
);

export default SearchCategory;
