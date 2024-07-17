import Box from '@mui/material/Box';
import UserPageCard from './components/UserPageCard';
import UsersManage from './components/UsersManage';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';

const UsersPage = () => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <UserPageCard />
      <UsersManage />
    </Box>
  );
};

export default UsersPage;
