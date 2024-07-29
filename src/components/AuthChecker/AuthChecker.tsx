import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { useEffect } from 'react';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // navigate('/login');
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default AuthChecker;
