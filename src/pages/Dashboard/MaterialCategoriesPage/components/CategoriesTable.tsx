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
import {
  deleteMaterialCategoryAPI,
  getMaterialCategoriesAPI,
} from '../../../../apis/materialCategories';
import useSearchQuery from '../../../../hooks/useSearchQuery';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import useAppContext from '../../../../hooks/useAppContext';

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
  const { setCountMaterialCategories } = useAppContext();
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  const { searchQuery } = useSearchQuery();

  const [open, setOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [idDelete, setIdDelete] = useState('');

  const handleOpenModel = (id: string) => {
    setOpen(true);
    setIdDelete(id);
  };

  const navigate = useNavigate();

  const loadMaterialCategories = async (name: string) => {
    const result = await getMaterialCategoriesAPI({ name });
    const { results, count, next, previous } = result.data;
    console.log(result.data);
    setCategories(results);
    setNext(next);
    setPrevious(previous);
    setCountCategories(count);
    setCountMaterialCategories(count);
  };

  const handleDelete = async (id: string) => {
    setLoadingDelete(true);
    const response = await deleteMaterialCategoryAPI(id);
    setLoadingDelete(false);
    if (response.status === 204) {
      toast('🔔 Deleted successfully!!!');
      setOpen(false);
      loadMaterialCategories(searchQuery);
    } else toast('⚠️ Deleted error!!!');
  };

  useEffect(() => {
    loadMaterialCategories(searchQuery);
  }, [searchQuery]);

  const actionRefs = React.useRef<HTMLDivElement[]>([]);

  const setActionRef = (element: HTMLDivElement, index: number) => {
    actionRefs.current[index] = element;
  };

  const [page, setPage] = React.useState(0);
  const limit = 5;

  const handleBackButtonClick = async () => {
    // getUrlParams()
    // prevClick();
    const offset = limit * (page - 1);
    const response = await getMaterialCategoriesAPI({
      name: '',
      offset,
    });
    setCategories(response.data.results);
    setPage((prev) => prev - 1);
    console.log(response.data);
  };

  const handleNextButtonClick = async () => {
    // nextClick();
    // onPageChange(page + 1);
    const offset = limit * (page + 1);
    const response = await getMaterialCategoriesAPI({
      name: '',
      offset,
    });
    setCategories(response.data.results);
    setPage((prev) => prev + 1);
    console.log(response.data);
  };

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
                        {index + 1 + limit * page}
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
          </TableContainer>
          <Box>
            <EnhancedTablePagination
              next={next}
              previous={previous}
              count={countCategories}
              page={page}
              limit={limit}
              handleBackButtonClick={handleBackButtonClick}
              handleNextButtonClick={handleNextButtonClick}
            />
          </Box>
        </Paper>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 bg-white w-full max-w-[400px] min-h-[100px] rounded-[16px] -translate-x-1/2 -translate-y-1/2 py-6 px-4">
            <div className="flex flex-col gap-y-6">
              <p className="font-bold text-18 text-gray/600">Delete</p>
              <p className="font-bold text-14 text-gray/500">
                Are you sure want to delete?
              </p>
              <div className="flex justify-end gap-2 ">
                <LoadingButton
                  loading={loadingDelete}
                  variant="contained"
                  sx={{
                    px: '12px',
                    py: '5px',
                    borderRadius: 2,
                    bgcolor: COLORS.red500,
                    fontWeight: 'bold',
                    color: 'white',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => handleDelete(idDelete)}
                >
                  Delete
                </LoadingButton>
                <Button
                  variant="outlined"
                  sx={{
                    px: '12px',
                    py: '5px',
                    borderRadius: 2,
                    border: `1px solid ${COLORS.gray300} `,
                    fontWeight: 'bold',
                    color: COLORS.gray600,
                    textTransform: 'capitalize',
                  }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </Box>
    </>
  );
};

export default CategoriesTable;
