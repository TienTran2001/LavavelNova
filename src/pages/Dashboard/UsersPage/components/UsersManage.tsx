import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import COLORS from '../../../../utils/colors';
import InputSearch from '../../../../components/Input/InputSearch';
import UsersTable from './UsersTable';
import useSearchQuery from '../../../../hooks/useSearchQuery';

const UsersManage = () => {
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
        Users
      </Typography>
      <Box
        mt="12px"
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
          Create User
        </Button>
      </Box>
      {/* --------------------table------------------------ */}
      <Box mt={3}>
        <UsersTable />
      </Box>
      {/* -------------------- end table------------------------ */}
    </Box>
  );
};

export default UsersManage;
