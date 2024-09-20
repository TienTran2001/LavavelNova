import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { COLORS } from '@/app/_constants';
import { alpha } from '@mui/material/styles';

interface EnhancedTableToolbarProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteAll?: () => void;
  rowCount: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected,
    rowCount,
    onSelectAllClick,
    handleDeleteAll = () => {},
  } = props;

  const handleDelete = () => {
    handleDeleteAll();
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2, md: '4px' },
        pr: { xs: 1, sm: 1 },
        justifyContent: 'space-between',
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Checkbox
        color="primary"
        sx={{ color: COLORS.gray300 }}
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
        inputProps={{
          'aria-label': 'select all desserts',
        }}
      />

      {numSelected > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
          <Tooltip title="Delete all">
            <Button sx={{ ml: 2 }} onClick={handleDelete}>
              <DeleteOutlineIcon sx={{ color: COLORS.gray600 }} />
            </Button>
          </Tooltip>
        </Typography>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
