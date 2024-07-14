import { Box, IconButton } from '@mui/material';
import COLORS from '../../utils/colors';
import SIZES from '../../utils/sizes';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
  placeholder?: string;
  backgroundColor?: string;
  className?: string;
}

const InputPrimary = ({
  placeholder = '',
  backgroundColor = 'white',
  className,
}: IProps) => {
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
      <IconButton aria-label="search" sx={{ color: COLORS.gray400, p: '6px' }}>
        <SearchIcon />
      </IconButton>
      <input
        type="text"
        className="w-full px-2 bg-transparent outline-none text-14 text-gray/600"
        placeholder={placeholder}
      />
    </Box>
  );
};

export default InputPrimary;
