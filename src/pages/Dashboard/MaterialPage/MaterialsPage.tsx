// @react
import { Link } from 'react-router-dom';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// @components
import InputSearch from '~/components/Input/InputSearch';
import MaterialsTable from './components/MaterialsTable';

// @hooks
import useSearchQuery from '~/hooks/useSearchQuery';

// @utils
import COLORS from '~/utils/colors';
import currentPath from '~/utils/currentPath';

export default function MaterialsPage() {
  const { searchQuery, setSearchQuery, handleOnSearch } = useSearchQuery();

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
        <Box>
          <InputSearch
            value={searchQuery}
            onSearch={handleOnSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="shadow-sm"
          />
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
