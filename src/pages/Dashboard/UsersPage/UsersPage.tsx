import Box from '@mui/material/Box';
import UserPageCard from './components/UserPageCard';
import UsersManage from './components/UsersManage';

const UsersPage = () => {
  return (
    <Box>
      <UserPageCard />
      <UsersManage />
    </Box>
  );
};

export default UsersPage;
