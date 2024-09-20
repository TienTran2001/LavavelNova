import SearchBar from '@/app/_components/pages/material-categories/components/SearchBar';
import CategoriesTable from '@/app/_components/pages/material-categories/components/table/CategoriesTable';
import { COLORS } from '@/app/_constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const MaterialCategories = () => {
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
        <Box className="flex gap-x-5">
          <SearchBar />
        </Box>
        <Link href="/admin/materials/categories/create">
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

export default MaterialCategories;
