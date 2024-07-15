import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import COLORS from '../../../../utils/colors';
import Avatar from '@mui/material/Avatar';
import {
  actionIcon,
  checkedIcon,
  eyeIcon,
  filter,
  pencilIcon,
  trashIcon,
  videoCamera,
  xIcon,
} from '../../../../assets';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Button from '@mui/material/Button';
import CustomPagination from './CustomPaginationActions ';

interface Data {
  id: number;
  avatar: string;
  name: string;
  email: string;
  admin: boolean;
  twoFa: boolean;
}

function createData(
  id: number,
  avatar: string,
  name: string,
  email: string,
  admin: boolean,
  twoFa: boolean
): Data {
  return {
    id,
    avatar,
    name,
    email,
    admin,
    twoFa,
  };
}

const rows = [
  createData(
    1,
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Mior Zaki',
    'mior@nova.laravel.com',
    false,
    true
  ),
  createData(
    2,
    'https://i.pinimg.com/564x/c8/d3/6e/c8d36ef31d31f22dc0a0ba29104baf1c.jpg',
    'Suzy Kim',
    'suzykim@gmail.com',
    true,
    true
  ),
  createData(
    3,
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Dries Vints',
    'dries@nova.laravel.com',
    false,
    false
  ),
  createData(
    4,
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Ian Landsman',
    'ian@nova.laravel.com',
    false,
    true
  ),
  createData(
    5,
    'https://i.pinimg.com/736x/9d/ab/b3/9dabb3f3d0ea95b4f5de998430277606.jpg',
    'Kim Ye-Young',
    'kimhyeyoon@gmail.com',
    true,
    false
  ),
  createData(
    6,
    'https://images.unsplash.com/photo-1440589473619-3cde28941638?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Mohamed Said',
    'mohamed@nova.laravel.com',
    false,
    true
  ),

  createData(
    7,
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Suzy',
    'suzy@gmail.com',
    false,
    true
  ),
  createData(
    8,
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Taylor Hary',
    'hary@gmail.com',
    true,
    false
  ),
  createData(
    9,
    'https://i.pinimg.com/564x/9b/8f/b2/9b8fb25c5f0f072ef9ca71847744819d.jpg',
    'Suzy',
    'suzy@gmail.com',
    false,
    false
  ),
  createData(
    10,
    'https://i.pinimg.com/564x/9b/8f/b2/9b8fb25c5f0f072ef9ca71847744819d.jpg',
    'Suzy',
    'suzy@gmail.com',
    true,
    false
  ),
];

// hàm so sánh giảm dần
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id?: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'avatar',
    numeric: false,
    disablePadding: false,
    label: 'Avatar',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'admin',
    numeric: false,
    disablePadding: false,
    label: 'Admin',
  },
  {
    id: 'twoFa',
    numeric: false,
    disablePadding: false,
    label: '2fa',
  },
  {
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data | undefined) =>
    (event: React.MouseEvent<unknown>) => {
      if (property !== undefined) onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ backgroundColor: COLORS.gray100 }}>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                textTransform: 'uppercase',
                fontWeight: 800,
                color: COLORS.gray500,
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, rowCount, onSelectAllClick } = props;

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
}
export default function UsersTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dense, setDense] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={rows.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(Number(row.id));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, Number(row.id))}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: COLORS.gray300 }}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ fontWeight: 800, color: COLORS.primary500 }}
                    >
                      {row.id}
                    </TableCell>

                    <TableCell align="left">
                      <Avatar src={String(row.avatar)}></Avatar>
                    </TableCell>
                    <TableCell sx={{ color: COLORS.gray500 }} align="left">
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.gray500 }} align="left">
                      {row.email}
                    </TableCell>
                    <TableCell align="left">
                      {row.admin ? (
                        <img src={checkedIcon} alt="check" />
                      ) : (
                        <img src={xIcon} alt="x" />
                      )}
                    </TableCell>

                    <TableCell align="left">
                      {row.twoFa ? (
                        <img src={checkedIcon} alt="check" />
                      ) : (
                        <img src={xIcon} alt="x" />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        display="flex"
                        alignItems="center"
                        columnGap={2}
                        justifyContent="right"
                      >
                        <IconButton>
                          <img src={actionIcon} alt="action icon" />
                        </IconButton>
                        <IconButton>
                          <img src={eyeIcon} alt="eye icon" />
                        </IconButton>
                        <IconButton>
                          <img src={pencilIcon} alt="pencil icon" />
                        </IconButton>
                        <IconButton>
                          <img src={trashIcon} alt="trash icon" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <CustomPagination
            count={rows.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
          />
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // ActionsComponent={CustomPaginationActions}
          /> */}
        </Box>
      </Paper>
    </Box>
  );
}
