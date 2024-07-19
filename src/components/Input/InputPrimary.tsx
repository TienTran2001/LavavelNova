import { Box, IconButton } from '@mui/material';
import COLORS from '../../utils/colors';
import SIZES from '../../utils/sizes';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
  value: string;
  placeholder?: string;
  backgroundColor?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

const InputPrimary = ({
  value = '',
  placeholder = '',
  backgroundColor = 'white',
  className,
  onChange,
  onSearch = () => {},
}: IProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
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
        onClick={onSearch}
      >
        <SearchIcon />
      </IconButton>
      <input
        type="text"
        value={value}
        className="w-full px-2 bg-transparent outline-none text-14 text-gray/600"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default InputPrimary;
