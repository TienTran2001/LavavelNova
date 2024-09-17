// @react
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

// @components
import ModalDanger from '~/components/Modal/ModalDanger';
import {
  EnhancedTableHead,
  EnhancedTablePagination,
  EnhancedTableToolbar,
} from '~/components/Table';
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
import { IError, useErrorHandler } from '~/hooks/useErrorHandler';
import { IDataTable } from '~/pages/Dashboard/MaterialCategoriesPage/type';

interface IRefModel {
  open: () => void;
  close: () => void;
}

const initialValue = {
  count: 0,
  categories: [],
  loading: false,
};

const randomNumberInt = (max: number) => Math.floor(Math.random() * max);

const CategoriesTable = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearchQuery('name');

  const limit = 5;
  const [data, setData] = useState<IDataTable>(initialValue);
  const { page } = usePaging(Math.ceil(data.count / limit));

  const {
    selected,
    isSelected,
    setSelected,
    handleClickSelect,
    handleSelectAllClick,
  } = useSelectItemTable();
  const [categoryId, setCategoryId] = useState('');

  const [reload, setReload] = useState(false); // reload data table
  const { error, handleError } = useErrorHandler();

  // @ref
  const modalDeleteRef = useRef<IRefModel>(null);
  const modalDeleteALotRef = useRef<IRefModel>(null);

  // @handle
  const handleDelete = async (id: string) => {
    try {
      await deleteMaterialCategoryAPI(id);
      setReload((prev) => !prev);
      toast('🔔 Deleted successfully!!!');
    } catch (err) {
      modalDeleteRef.current?.close(); // not loading and close popup
      toast(`⚠️ Deleted error!!!`);
    }
  };

  const handleDeleteCategories = async (selected: string[]) => {
    try {
      await deleteMaterialCategoriesAPI(selected);
      setReload((prev) => !prev);
      toast('🔔 Deleted successfully!!');
    } catch (err) {
      modalDeleteALotRef.current?.close();
      toast('Deleted fail!');
    }
  };

  // @useEffect
  useEffect(() => {
    let ignore = false;

    const fetchCategories = async () => {
      const offset = (page - 1) * limit;
      try {
        if (randomNumberInt(5) === 1) {
          handleError(new Error('Lỗi nè'));
          return;
        }
        setData((prev) => ({ ...prev, loading: true }));
        const result = await getMaterialCategoriesAPI({
          name: searchQuery,
          offset,
        });
        if (!ignore) {
          const { results, count } = result.data;
          setData({ count: count, categories: results, loading: false });
          setSelected([]);
        }
      } catch (err) {
        if (!ignore) {
          setData((prev) => ({ ...prev, loading: false }));
          const errorResponse = err as IError;
          handleError(new Error(errorResponse.message));
        }
      }
    };

    fetchCategories();

    return () => {
      ignore = true;
    };
  }, [handleError, page, searchQuery, setSelected, reload]);

  if (error) {
    throw error;
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onSelectAllClick={(e) => handleSelectAllClick(e, data.categories)}
            rowCount={data.categories.length}
            handleDeleteAll={() => modalDeleteALotRef?.current?.open()}
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
                                setCategoryId(row.id);
                                modalDeleteRef?.current?.open();
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
          ref={modalDeleteRef}
          content="Are you sure want to delete?"
          handleDelete={() => handleDelete(categoryId)}
        />
        <ModalDanger
          ref={modalDeleteALotRef}
          content="You want to delete the selected material categories?"
          handleDelete={() => handleDeleteCategories(selected)}
        />
      </Box>
    </>
  );
};

export default CategoriesTable;
