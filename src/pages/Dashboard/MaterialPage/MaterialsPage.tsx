// @react
import { Link } from 'react-router-dom';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// @components
import ErrorBoundary from '~/components/Error/ErrorBoundary';
import ErrorDataTable from '~/components/Error/ErrorComponent';
import SearchBar from '~/pages/Dashboard/MaterialPage/components/SearchBar';
import MaterialsTable from './components/MaterialsTable';

// @utils
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
      <div className="mt-50 flex justify-between max-w-[1200px] w-full">
        {/* ------------------ search ------------------ */}
        <div className="w-[80%] ">
          <SearchBar />
        </div>
        {/* ------------------ end search ------------------ */}
        <div className="flex-shrink-0">
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
        </div>
      </div>

      {/* --------------------table------------------------ */}
      <Box mt={3}>
        <ErrorBoundary fallback={ErrorDataTable}>
          <MaterialsTable />
        </ErrorBoundary>
      </Box>
      {/* -------------------- end table------------------------ */}
    </Box>
  );
}
