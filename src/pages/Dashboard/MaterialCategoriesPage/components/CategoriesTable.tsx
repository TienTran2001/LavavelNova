import React, { useEffect, useState } from 'react';
import { category } from './CategoriesManage';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EnhancedTableToolbar from '../../../../components/Table/EnhancedTableToolbar/EnhancedTableToolbar';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import COLORS from '../../../../utils/colors';
import EnhancedTableHead from '../../../../components/Table/EnhancedTableHead/EnhancedTableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { pencilIcon, trashIcon } from '../../../../assets';
import IconButton from '@mui/material/IconButton';
import EnhancedTablePagination from '../../../../components/Table/EnhancedTablePagination/EnhancedTablePagination';
import { getMaterialCategoriesAPI } from '../../../../apis/materialCategories';
import useSearchQuery from '../../../../hooks/useSearchQuery';

interface Data {
  id: number;
  image: string;
  name: string;
  price_type: string;
}

interface HeadCell {
  disablePadding: boolean;
  id?: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'NO',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'price_type',
    numeric: false,
    disablePadding: false,
    label: 'Price type',
  },
  {
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

const CategoriesTable = () => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const [categories, setCategories] = useState<category[]>([]);
  const [countCategories, setCountCategories] = useState<number>(0);
  const { searchQuery } = useSearchQuery();
  console.log(categories);

  const loadMaterialCategories = async (name: string) => {
    const result = await getMaterialCategoriesAPI({ name });
    const { results, count } = result.data;
    setCategories(results);
    setCountCategories(count);
  };

  useEffect(() => {
    loadMaterialCategories(searchQuery);
  }, [searchQuery]);

  const actionRefs = React.useRef<HTMLDivElement[]>([]);

  const setActionRef = (element: HTMLDivElement, index: number) => {
    actionRefs.current[index] = element;
  };

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 7;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = categories.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    id: string,
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    // Kiểm tra hành động click
    if (
      actionRefs.current[index] &&
      actionRefs.current[index].contains(e.target as Node)
    ) {
      return;
    }

    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={categories.length}
          selected={selected}
        />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              borderBottom: `0.5px solid ${COLORS.gray300}`,
            }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              // onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {categories.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(e) => handleClick(row.id, e, index)}
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
                      {index + 1}
                    </TableCell>

                    <TableCell align="left">
                      <img
                        src={String(row.image)}
                        className="w-[150px] h-[80px] object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell sx={{ color: COLORS.gray500 }} align="left">
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.gray500 }} align="left">
                      {row.price_type === 'per_quantity'
                        ? 'quantity'
                        : 'metter'}
                    </TableCell>
                    <TableCell
                      ref={(element: HTMLDivElement) =>
                        setActionRef(element, index)
                      }
                      align="left"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        columnGap={2}
                        justifyContent="right"
                      >
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
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <EnhancedTablePagination
            count={countCategories}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default CategoriesTable;
