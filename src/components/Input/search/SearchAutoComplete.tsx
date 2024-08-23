import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface IProps<T> {
  options: T[];
  displayKey: string;
}

export default function SearchAutoComplete<T>({
  options,
  displayKey,
}: IProps<T>) {
  console.log('hihi: ', displayKey);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options.map((option) => option[displayKey as keyof T])}
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
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
}
