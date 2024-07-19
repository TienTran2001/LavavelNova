import { Box, Button } from '@mui/material';
import COLORS from '../../../utils/colors';
import usePaging from '../../../hooks/usePaging';

interface IProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
}
const EnhancedTablePagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: IProps) => {
  // console.log('🚀 ~ rowsPerPage:', rowsPerPage);
  // console.log('🚀 ~ page:', page);
  // console.log('🚀 ~ count:', count);

  const { prevClick, nextClick } = usePaging(page, onPageChange);

  const handleBackButtonClick = () => {
    prevClick();
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    nextClick();
    onPageChange(page + 1);
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

export default EnhancedTablePagination;
