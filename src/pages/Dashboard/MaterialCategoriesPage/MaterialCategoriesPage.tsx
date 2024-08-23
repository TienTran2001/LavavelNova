// @react
import { Link } from 'react-router-dom';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// @components
import InputSearch from '~/components/Input/search/InputSearch';
import CategoriesTable from './components/CategoriesTable';

// @utils
import COLORS from '~/utils/colors';

const MaterialCategoriesPage = () => {
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
      <Box
        mt="50px"
        display={'flex'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <InputSearch placeholder="Search" className="shadow-sm" />
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
          </Button>
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

export default MaterialCategoriesPage;
