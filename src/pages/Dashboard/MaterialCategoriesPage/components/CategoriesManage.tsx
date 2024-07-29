import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import COLORS from '../../../../utils/colors';
import InputPrimary from '../../../../components/Input/InputPrimary';
import useSearchQuery from '../../../../hooks/useSearchQuery';

import CategoriesTable from './CategoriesTable';
import { Link } from 'react-router-dom';
import CategoriesPageCard from './CategoriesCard';
import useAppContext from '../../../../hooks/useAppContext';

export interface category {
  id: string;
  image: string;
  name: string;
  price_type: string;
}

const CategoriesManage = () => {
  const { searchQuery, setSearchQuery, handleOnSearch } = useSearchQuery();
  const context = useAppContext();

  return (
    <Box>
      <Typography
        component="h2"
        mt={3}
        fontSize={24}
        color={COLORS.gray500}
        fontWeight={400}
      >
        Material Categories
      </Typography>
      <Box mt={3}>
        <CategoriesPageCard count={context.countMaterialCategories} />
      </Box>
      <Box
        mt="50px"
        display={'flex'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <InputPrimary
            value={searchQuery}
            onSearch={handleOnSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="shadow-sm"
          />
        </Box>
        <Link to="/materials/categories/create">
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLORS.primary500,
              fontSize: 14,
              fontWeight: 800,
              color: 'white',
              textTransform: 'none',
              borderRadius: '4px',
            }}
          >
            Create Category
          </Button>{' '}
        </Link>
      </Box>

      {/* --------------------table------------------------ */}
      <Box mt={3}>
        <CategoriesTable />
      </Box>
      {/* -------------------- end table------------------------ */}
    </Box>
  );
};

export default CategoriesManage;
