import { COLORS, SIZES } from '@/app/_constants';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

interface IProps {
  placeholder?: string;
  backgroundColor?: string;
  className?: string;
  query: string;
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const InputSearch = ({
  placeholder = '',
  backgroundColor = 'white',
  className,
  query,
  field,
}: IProps) => {
  console.log(query);
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
        {...field}
        type="text"
        className="w-full px-2 bg-transparent outline-none text-14 text-gray/600"
        placeholder={placeholder}
      />
    </Box>
  );
};

export default InputSearch;
