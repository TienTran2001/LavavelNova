import { Box, Button } from '@mui/material';
import COLORS from '../../../utils/colors';

interface IProps {
  count: number;
  limit: number;
  page: number;
  next: string | null;
  previous: string | null;
  handleBackButtonClick: () => void;
  handleNextButtonClick: () => void;
}

const EnhancedTablePagination = ({
  count,
  limit,
  page,
  handleBackButtonClick,
  handleNextButtonClick,
}: IProps) => {
  // console.log('🚀 ~ previous:', previous);
  // console.log('🚀 ~ next:', next);
  // console.log('🚀 ~ rowsPerPage:', rowsPerPage);
  // console.log('🚀 ~ page:', page);
  // console.log('🚀 ~ count:', count);
  // const { prevClick, nextClick } = usePaging(page, onPageChange);

  return (
    <div className="flex items-center justify-between cs-table-pagination ">
      <Button
        onClick={handleBackButtonClick}
        disabled={page < 1 ? true : false}
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
        {`${page + 1} of ${Math.ceil(count / limit)}`}
      </Box>
      <Button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / limit - 1) ? true : false}
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
