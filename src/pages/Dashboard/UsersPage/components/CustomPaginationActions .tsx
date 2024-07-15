import { Box, Button } from '@mui/material';
import COLORS from '../../../../utils/colors';

interface IProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
const CustomPagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: IProps) => {
  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  return (
    <div className="flex items-center justify-between cs-table-pagination ">
      <Button
        onClick={handleBackButtonClick}
        disabled={page === 0}
        sx={{
          textTransform: 'none',
          p: '11px 16px',
          fontWeight: 800,
          color: COLORS.gray300,
          fontSize: 12,
        }}
      >
        Previous
      </Button>
      <Box sx={{ fontWeight: 400, fontSize: 12, color: COLORS.gray500 }}>
        {`${page + 1} of ${Math.ceil(count / rowsPerPage)}`}
      </Box>
      <Button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        sx={{
          textTransform: 'none',
          p: '11px 16px',
          fontWeight: 800,
          color: COLORS.gray300,
          fontSize: 12,
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default CustomPagination;
