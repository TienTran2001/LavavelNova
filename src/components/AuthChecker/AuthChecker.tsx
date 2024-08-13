// @react
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// @store
import { useUserStore } from '~/store/useUserStore';

// @utils
import currentPath from '~/utils/currentPath';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(currentPath.login);
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default AuthChecker;
