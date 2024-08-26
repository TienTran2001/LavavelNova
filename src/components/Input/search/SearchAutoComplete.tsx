import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import useSearchQuery from '~/hooks/useSearchQuery';
import COLORS from '~/utils/colors';

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
    <>
      <Autocomplete
        freeSolo
        disableClearable
        options={options.map((option) => option[displayKey as keyof T])}
        inputValue={searchQuery}
        onInputChange={(_, newInputValue) => {
          setSearchQuery(newInputValue.trim());
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
              placeholder="Category name..."
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 14,
                },
              }}
              onKeyDown={handleKeyDown}
            />
            {searchQuery.length > 0 && (
              <div className="absolute top-0 right-0">
                <IconButton
                  aria-label="clear"
                  sx={{ color: COLORS.gray400, p: '8px' }}
                  onClick={() => {
                    setSearchQuery('');
                  }}
                >
                  <CancelRoundedIcon
                    sx={{
                      fontSize: 18,
                      color: COLORS.gray300,
                    }}
                  />
                </IconButton>
              </div>
            )}
          </div>
        )}
      />
    </>
  );
}
