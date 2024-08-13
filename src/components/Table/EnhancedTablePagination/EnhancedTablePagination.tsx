import { Box, Button } from '@mui/material';
import COLORS from '../../../utils/colors';
import usePaging from '../../../hooks/usePaging';

interface IProps {
  count: number;
  limit: number;
  setLoading: () => void;
}

const EnhancedTablePagination = ({ count, limit, setLoading }: IProps) => {
  const { prevClick, nextClick, page } = usePaging(Math.ceil(count / limit));
  const handleNext = () => {
    setLoading();
    nextClick();
  };
  const handleBack = () => {
    setLoading();
    prevClick();
  };
  return (
    <div className="flex items-center justify-between cs-table-pagination ">
      <Button
        onClick={handleBack}
        disabled={page <= 1 ? true : false}
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
        {`${page} of ${Math.ceil(count / limit)}`}
      </Box>
      <Button
        onClick={handleNext}
        disabled={page >= Math.ceil(count / limit) ? true : false}
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
