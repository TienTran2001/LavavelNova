import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import COLORS from '~/utils/colors';
import SIZES from '~/utils/sizes';

const SearchTop = () => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.gray100,
        borderRadius: 9999,
        display: 'flex',
        minWidth: SIZES.inputTopBar,
      }}
    >
      <IconButton aria-label="search" sx={{ color: COLORS.gray400, p: '6px' }}>
        <SearchIcon />
      </IconButton>
      <input
        type="text"
        value=""
        className="w-full px-2 bg-transparent outline-none text-14 text-gray/600"
        placeholder="Press / to search"
      />
    </Box>
  );
};

export default SearchTop;
