import React, { useCallback, useEffect, useState } from 'react';
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
import {
  deleteMaterialCategoriesAPI,
  deleteMaterialCategoryAPI,
  getMaterialCategoriesAPI,
} from '../../../../apis/materialCategories';
import useSearchQuery from '../../../../hooks/useSearchQuery';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableSkeleton from '../../../../components/Sekeletons/TableSkeleton';
import usePaging from '../../../../hooks/usePaging';
import ModalDanger from '../../../../components/Modal/ModalDanger';

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
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [countCategories, setCountCategories] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [openModalDeleteAll, setOpenModalDeleteAll] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  // const [loadingDeleteCategories, setLoadingDeleteCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const { searchQuery } = useSearchQuery();
  const [idDelete, setIdDelete] = useState('');
  const limit = 5;
  const { page } = usePaging();

  const actionRefs = React.useRef<HTMLDivElement[]>([]);

  const setActionRef = (element: HTMLDivElement, index: number) => {
    actionRefs.current[index] = element;
  };

  const handleOpenModel = (id: string) => {
    setOpen(true);
    setIdDelete(id);
  };

  const loadMaterialCategories = async (name: string, offset: number = 0) => {
    const result = await getMaterialCategoriesAPI({ name, offset });
    setLoading(false);
    const { results, count } = result.data;
    setCategories(results);
    setCountCategories(count);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoadingDelete(true);
      await deleteMaterialCategoryAPI(id);
      setLoadingDelete(false);
      setOpen(false);
      setLoading(true);
      toast('🔔 Deleted successfully!!!');
    } catch (err) {
      setLoadingDelete(false);
      toast(`⚠️ Deleted error!!!`);
    }
  };

  const handleDeleteCategories = async (selected: string[]) => {
    try {
      await deleteMaterialCategoriesAPI(selected);
      setLoadingDelete(false);
      setLoading(true);
      setOpenModalDeleteAll(false);
      setSelected([]);
      toast('🔔 Deleted successfully!!');
    } catch (err) {
      setLoadingDelete(false);
      toast('Deleted fail!');
    }
  };

  useEffect(() => {
    if (loading) {
      const offset = (page - 1) * limit;
      loadMaterialCategories(searchQuery, offset);
    }
  }, [searchQuery, page, limit, loading, setLoading]);

  useEffect(() => {
    setLoading(true);
    loadMaterialCategories(searchQuery, 0);
  }, [searchQuery]);

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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={categories.length}
            handleDeleteAll={() => setOpenModalDeleteAll(true)}
          />

          <TableContainer>
            {!loading ? (
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
                          {index + 1 + limit * (page - 1)}
                        </TableCell>

                        <TableCell align="left">
                          <img
                            src={String(row.image)}
                            className="w-[150px] h-[80px] object-cover rounded-lg"
                          />
                        </TableCell>
                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className=" max-w-[300px] line-clamp-1">
                            {row.name}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          {row.price_type === 'per_quantity' ? (
                            <>
                              <span className="px-[6px] py-[3px] font-bold bg-[#FFF1D6] rounded-[8px] text-[#B76E00] ">
                                Quantity
                              </span>
                            </>
                          ) : (
                            <span className="px-[6px] py-[3px] font-bold bg-green-500/30 rounded-[8px] text-[#C03530] ">
                              Metter
                            </span>
                          )}
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
                            <IconButton
                              onClick={() =>
                                navigate(`/materials/categories/${row.id}`)
                              }
                            >
                              <img src={pencilIcon} alt="pencil icon" />
                            </IconButton>
                            <IconButton onClick={() => handleOpenModel(row.id)}>
                              <img src={trashIcon} alt="trash icon" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <>
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
              </>
            )}
          </TableContainer>
          <Box>
            <EnhancedTablePagination
              count={countCategories}
              limit={limit}
              setLoading={setLoading}
            />
          </Box>
        </Paper>
        <ModalDanger
          content="Are you sure want to delete?"
          key={Math.random()}
          loading={loadingDelete}
          open={open}
          setOpen={setOpen}
          handleDelete={() => handleDelete(idDelete)}
        />
        <ModalDanger
          content={'You want to delete the selected items?'}
          key={Math.random()}
          loading={loadingDelete}
          open={openModalDeleteAll}
          setOpen={setOpenModalDeleteAll}
          handleDelete={() => handleDeleteCategories(selected)}
        />
      </Box>
    </>
  );
};

export default CategoriesTable;
