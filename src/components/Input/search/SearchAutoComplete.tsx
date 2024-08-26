import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useSearchQuery from '~/hooks/useSearchQuery';

interface IProps<T> {
  options: T[];
  displayKey: string;
}

export default function SearchAutoComplete<T>({
  options,
  displayKey,
}: IProps<T>) {
  const { searchQuery, setSearchQuery, handleOnSearch } =
    useSearchQuery('_category');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnSearch();
    }
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options.map((option) => option[displayKey as keyof T])}
      inputValue={searchQuery}
      onInputChange={(_, newInputValue) => {
        setSearchQuery(newInputValue);
      }}
      sx={{
        width: '300px',
        '& .MuiInputBase-root': {
          bgcolor: 'white',
          borderRadius: 9999,
          height: '36px',
        },
        '& fieldset': {
          border: 'none',
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Category name..."
          sx={{
            '& .MuiInputBase-input': {
              fontSize: 14,
            },
          }}
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
}
