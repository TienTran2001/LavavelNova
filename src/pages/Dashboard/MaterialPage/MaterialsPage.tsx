// @react
import { Link } from 'react-router-dom';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// @components
import InputSearch from '~/components/Input/search/InputSearch';
import MaterialsTable from './components/MaterialsTable';

// @utils
import SearchCategory from '~/pages/Dashboard/MaterialPage/components/SearchCategory';
import COLORS from '~/utils/colors';
import currentPath from '~/utils/currentPath';

export default function MaterialsPage() {
  return (
    <Box>
      <Typography
        component="h2"
        mt={3}
        fontSize={24}
        color={COLORS.gray500}
        fontWeight={400}
      >
        Materials
      </Typography>
      <Box
        mt="50px"
        display={'flex'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="flex items-center gap-x-5">
          <InputSearch placeholder="Search name..." className="shadow-sm" />
          <SearchCategory />
        </Box>
        <Link to={currentPath.materials.create}>
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
            Create Material
          </Button>
        </Link>
      </Box>

      {/* --------------------table------------------------ */}
      <Box mt={3}>
        <MaterialsTable />
      </Box>
      {/* -------------------- end table------------------------ */}
    </Box>
  );
}
