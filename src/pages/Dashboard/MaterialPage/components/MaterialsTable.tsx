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
import { CategoriesSkeleton } from '~/pages/Dashboard/MaterialCategoriesPage/components/skeletonLoading';

// @hooks
import usePaging from '~/hooks/usePaging';
import useSearchQuery from '~/hooks/useSearchQuery';
import useSelectItemTable from '~/hooks/useSelectItemTable';

// @utils
import COLORS from '~/utils/colors';
import { calculateItemIndexInTable } from '~/utils/constants';
import { headCellsMaterialsTable } from '~/utils/tableMaterials';

// @apis
import {
  deleteMaterialAPI,
  deleteMaterialsAPI,
  getMaterialsAPI,
} from '~/apis/materials';

// @assets
import { pencilIcon, trashIcon } from '~/assets';

// @types
import ErrorWithRetry from '~/components/Error/ErrorWithRetry';
import { IError, useErrorHandler } from '~/hooks/useErrorHandler';
import { IDataTableMaterial } from '../type';

interface IRefModel {
  open: () => void;
  close: () => void;
}

const initialValue = {
  count: 0,
  materials: [],
  loading: false,
};

const MaterialsTable = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearchQuery();

  const limit = 5;
  const [data, setData] = useState<IDataTableMaterial>(initialValue);
  const { page } = usePaging(Math.ceil(data.count / limit));

  const [materialId, setMaterialId] = useState('');

  const {
    selected,
    isSelected,
    setSelected,
    handleClickSelect,
    handleSelectAllClick,
  } = useSelectItemTable();

  const [reload, setReload] = useState(false); // reload data table
  const { error, handleError, handleRetry } = useErrorHandler();

  // @ref
  const modalDeleteRef = useRef<IRefModel>(null);
  const modalDeleteALotRef = useRef<IRefModel>(null);

  // @handle
  const handleDelete = async (id: string) => {
    try {
      await deleteMaterialAPI(id);
      setReload((prev) => !prev);
      toast('🔔 Deleted successfully!!!');
    } catch (err) {
      modalDeleteRef.current?.close(); // not loading and close popup
      toast(`⚠️ Deleted error!!!`);
    }
  };

  const handleDeleteMaterials = async (selected: string[]) => {
    try {
      await deleteMaterialsAPI(selected);
      setReload((prev) => !prev);
      toast('🔔 Deleted successfully!!');
    } catch (err) {
      modalDeleteALotRef.current?.close();
      toast('⚠️ Deleted fail!');
    }
  };

  // @effect
  useEffect(() => {
    let ignore = false;

    const fetchMaterials = async () => {
      const offset = (page - 1) * limit;
      try {
        setData((prev) => ({ ...prev, loading: true }));
        const result = await getMaterialsAPI({
          name: searchQuery,
          offset,
        });
        setData((prev) => ({ ...prev, loading: false }));
        if (!ignore) {
          const { results, count } = result.data;
          setData({ count: count, materials: results, loading: false });
          setSelected([]);
        }
      } catch (err) {
        if (!ignore) {
          setData((prev) => ({ ...prev, loading: false }));
          const errorResponse = err as IError;
          handleError(errorResponse);
        }
      }
    };

    fetchMaterials();

    return () => {
      ignore = true;
    };
  }, [handleError, searchQuery, page, limit, setSelected, reload]);

  if (error) {
    return (
      <ErrorWithRetry
        errorMessage={error}
        onRetry={() => handleRetry(() => setReload((prev) => !prev))}
      />
    );
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onSelectAllClick={(e) => handleSelectAllClick(e, data.materials)}
            rowCount={data.materials.length}
            handleDeleteAll={() => modalDeleteALotRef.current?.open()}
          />

          <TableContainer>
            {!data.loading ? (
              <Table
                sx={{
                  minWidth: 1600,
                  borderBottom: `0.5px solid ${COLORS.gray300}`,
                }}
                aria-labelledby="tableTitle"
                size={'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  headCells={headCellsMaterialsTable}
                />
                <TableBody>
                  {data.materials.map((row, index) => {
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
                            {row.part_number}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className=" max-w-[300px] line-clamp-1">
                            {row.name}
                          </span>
                        </TableCell>

                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className=" max-w-[300px] line-clamp-1">
                            {row.large_title}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className=" max-w-[300px] line-clamp-1">
                            {row.small_title}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className="px-[6px] py-[3px] font-bold bg-green-500/30 rounded-[8px] text-[#C03530] ">
                            {row.type}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className="inline-block max-w-[300px] line-clamp-1 px-[6px] py-[3px] font-bold bg-[#FFF1D6] rounded-[8px] text-[#B76E00] ">
                            {row.category.name}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className=" max-w-[300px] line-clamp-1">
                            {row.supplier.name}
                          </span>
                        </TableCell>

                        <TableCell sx={{ color: COLORS.gray500 }} align="left">
                          <span className=" max-w-[300px] line-clamp-1">
                            {row.basic_price}
                          </span>
                        </TableCell>

                        <TableCell align="left">
                          <Box
                            display="flex"
                            alignItems="center"
                            columnGap={2}
                            justifyContent="right"
                          >
                            <IconButton
                              onClick={() => navigate(`/materials/${row.id}`)}
                            >
                              <img src={pencilIcon} alt="pencil icon" />
                            </IconButton>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setMaterialId(row.id);
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
          handleDelete={() => handleDelete(materialId)}
        />
        <ModalDanger
          ref={modalDeleteALotRef}
          content="You want to delete the selected materials?"
          handleDelete={() => handleDeleteMaterials(selected)}
        />
      </Box>
    </>
  );
};

export default MaterialsTable;
