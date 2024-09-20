import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface IProps<T> {
  options: T[];
  displayKey: string;
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export default function SearchAutoComplete<T>({
  options,
  displayKey,
  field,
}: IProps<T>) {
  return (
    <>
      <Autocomplete
        freeSolo
        disableClearable
        options={options.map((option) => option[displayKey as keyof T])}
        inputValue={field.value}
        onInputChange={(_, newInputValue) => {
          field.onChange({
            target: { value: newInputValue.trim() },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        sx={{
          width: '300px',
          '& .MuiInputBase-root': {
            pr: '30px',
            bgcolor: 'white',
            borderRadius: 9999,
            height: '36px',
          },
          '& fieldset': {
            border: 'none',
          },
        }}
        renderInput={(params) => (
          <div className="relative">
            <TextField
              {...params}
              {...field}
              placeholder="Category name..."
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 14,
                },
              }}
            />
          </div>
        )}
      />
    </>
  );
}
