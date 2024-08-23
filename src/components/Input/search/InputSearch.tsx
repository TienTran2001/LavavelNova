// @mui
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

// @hooks
import useSearchQuery from '~/hooks/useSearchQuery';

// @utils
import COLORS from '~/utils/colors';
import SIZES from '~/utils/sizes';

interface IProps {
  placeholder?: string;
  backgroundColor?: string;
  className?: string;
  query?: string;
}

const InputSearch = ({
  placeholder = '',
  backgroundColor = 'white',
  className,
  query,
}: IProps) => {
  const { searchQuery, setSearchQuery, handleOnSearch } = useSearchQuery(query);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnSearch();
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: 9999,
        display: 'flex',
        minWidth: SIZES.inputTopBar,
      }}
      className={className}
    >
      <IconButton
        aria-label="search"
        sx={{ color: COLORS.gray400, p: '6px' }}
        onClick={handleOnSearch}
      >
        <SearchIcon />
      </IconButton>
      <input
        type="text"
        value={searchQuery}
        className="w-full px-2 bg-transparent outline-none text-14 text-gray/600"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default InputSearch;
