import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import COLORS from '../../../utils/colors';
import TableSortLabel from '@mui/material/TableSortLabel';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { Typography } from '@mui/material';

type Order = 'asc' | 'desc';
interface HeadCell<T> {
  disablePadding: boolean;
  id?: keyof T;
  label: string;
  numeric: boolean;
}
export interface EnhancedTableProps<T> {
  numSelected: number;
  onRequestSort: (property: keyof T) => void;
  order: Order;
  orderBy: keyof T;
  headCells: HeadCell<T>[];
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: keyof T | undefined) => () => {
    if (property !== undefined) onRequestSort(property);
  };

  const sortableColumns = new Set(['name', 'id', 'email']);

  return (
    <TableHead sx={{ backgroundColor: COLORS.gray100 }}>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {sortableColumns.has(String(headCell.id)) ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                IconComponent={
                  order === 'desc' ? UnfoldMoreIcon : UnfoldMoreIcon
                }
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: COLORS.gray500,
                  fontSize: '14px',
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: COLORS.gray500,
                  fontSize: '14px',
                  display: 'flex',
                  alignItem: 'center',
                }}
              >
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
