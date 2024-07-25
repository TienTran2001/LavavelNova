import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import COLORS from '../../../utils/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';
import { alpha } from '@mui/material/styles';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { filter, videoCamera } from '../../../assets';

interface EnhancedTableToolbarProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  selected: number[] | string[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, rowCount, onSelectAllClick, selected } = props;
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
            <Button sx={{ ml: 2 }} onClick={() => toast(`${selected}`)}>
              <DeleteOutlineIcon sx={{ color: COLORS.gray600 }} />
            </Button>
          </Tooltip>
        </Typography>
      )}
      <div className="flex items-center gap-x-2">
        <Tooltip title="video">
          <Button>
            <img src={videoCamera} alt="video icon" />
            <ExpandMoreOutlinedIcon sx={{ color: COLORS.gray500 }} />
          </Button>
        </Tooltip>
        <Tooltip title="Filter list">
          <Button>
            <img src={filter} alt="filter icon" />
            <ExpandMoreOutlinedIcon sx={{ color: COLORS.gray500 }} />
          </Button>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
