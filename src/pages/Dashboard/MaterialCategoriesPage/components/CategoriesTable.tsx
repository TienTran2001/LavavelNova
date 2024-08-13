// @react
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

// @components
import {
  EnhancedTableHead,
  EnhancedTablePagination,
  EnhancedTableToolbar,
} from '~/components/Table';
import ModalDanger from '~/components/Modal/ModalDanger';
import { CategoriesSkeleton } from './skeletonLoading';

// @hooks
import usePaging from '~/hooks/usePaging';
import useSearchQuery from '~/hooks/useSearchQuery';
import useSelectItemTable from '~/hooks/useSelectItemTable';

// @utils
import COLORS from '~/utils/colors';
import { calculateItemIndexInTable } from '~/utils/constants';
import { headCellsCategoriesTable } from '~/utils/tableCategories';

// @apis
import {
  deleteMaterialCategoriesAPI,
  deleteMaterialCategoryAPI,
  getMaterialCategoriesAPI,
} from '~/apis/materialCategories';

// @assets
import { pencilIcon, trashIcon } from '~/assets';

// @types
import { IDataTable, IDeleteCategory } from '../type';

const CategoriesTable = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearchQuery();
  const limit = 5;

  const {
    selected,
    isSelected,
    setSelected,
    handleClickSelect,
    handleSelectAllClick,
  } = useSelectItemTable();

  const [reload, setReload] = useState(false);
  const [data, setData] = useState<IDataTable>({
    count: 0,
    categories: [],
    loading: false,
  });
  const { page } = usePaging(Math.ceil(data.count / limit));

  const [deleteCategory, setDeleteCategory] = useState<IDeleteCategory<string>>(
    {
      id: '',
      open: false,
      loading: false,
    }
  );

  const [deleteCategories, setDeleteCategories] = useState<
    IDeleteCategory<string[]>
  >({
    id: [],
    open: false,
    loading: false,
  });

  const handleDelete = async (id: string) => {
    try {
      setDeleteCategory((prev) => ({ ...prev, loading: true }));
      await deleteMaterialCategoryAPI(id);
      setDeleteCategory((prev) => ({ ...prev, loading: false, open: false }));
      setReload((prev) => !prev);
      toast('🔔 Deleted successfully!!!');
    } catch (err) {
      setDeleteCategory((prev) => ({
        ...prev,
        loading: false,
        open: false,
      }));
      toast(`⚠️ Deleted error!!!`);
    }
  };

  const handleDeleteCategories = async (selected: string[]) => {
    try {
      await deleteMaterialCategoriesAPI(selected);
      setDeleteCategories((prev) => ({ ...prev, loading: false, open: false }));
      setReload((prev) => !prev);
      toast('🔔 Deleted successfully!!');
    } catch (err) {
      setDeleteCategories((prev) => ({ ...prev, loading: false, open: false }));
      toast('Deleted fail!');
    }
  };

  useEffect(() => {
    console.log('vào ');
    let ignore = false;

    const fetchCategories = async () => {
      const offset = (page - 1) * limit;
      try {
        setData((prev) => ({ ...prev, loading: true }));
        const result = await getMaterialCategoriesAPI({
          name: searchQuery,
          offset,
        });
        setData((prev) => ({ ...prev, loading: false }));
        if (!ignore) {
          const { results, count } = result.data;
          setData({ count: count, categories: results, loading: false });
          setSelected([]);
        }
      } catch (err) {
        if (!ignore) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchCategories();

    return () => {
      ignore = true;
    };
  }, [searchQuery, page, limit, setSelected, reload]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onSelectAllClick={(e) => handleSelectAllClick(e, data.categories)}
            rowCount={data.categories.length}
            handleDeleteAll={() =>
              setDeleteCategories((prev) => ({ ...prev, open: true }))
            }
          />

          <TableContainer>
            {!data.loading ? (
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
                  headCells={headCellsCategoriesTable}
                />
                <TableBody>
                  {data.categories.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={() => handleClickSelect(row.id)}
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
                          {calculateItemIndexInTable(index, limit, page)}
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
                        <TableCell align="left">
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
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteCategory((prev) => ({
                                  ...prev,
                                  id: row.id,
                                  open: true,
                                }));
                              }}
                            >
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
              <CategoriesSkeleton />
            )}
          </TableContainer>
          <Box>
            <EnhancedTablePagination
              count={data.count}
              limit={limit}
              setLoading={() => setData((prev) => ({ ...prev, loading: true }))}
            />
          </Box>
        </Paper>
        <ModalDanger
          content="Are you sure want to delete?"
          loading={deleteCategory.loading}
          open={deleteCategory.open}
          handleClose={() =>
            setDeleteCategory((prev) => ({ ...prev, open: false }))
          }
          handleDelete={() => handleDelete(deleteCategory.id)}
        />
        <ModalDanger
          content={'You want to delete the selected material categories?'}
          loading={deleteCategories.loading}
          open={deleteCategories.open}
          handleClose={() =>
            setDeleteCategories((prev) => ({ ...prev, open: false }))
          }
          handleDelete={() => handleDeleteCategories(selected)}
        />
      </Box>
    </>
  );
};

export default CategoriesTable;
