import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { toast } from 'react-toastify';
import { loginAPI, refreshTokenAPI } from '../../apis/auth';
import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
  const [valueLogin, setValueLogin] = useState<{
    email: string;
    password: string;
  }>({
    email: 'admin@gmail.com',
    password: '123456',
  });
  const [tokenInput, setTokenInput] = useState('');

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setUser, setToken, setRefreshToken } = useUserStore();

  const handleRefresh = async () => {
    const res = await refreshTokenAPI({ refresh: tokenInput });
    console.log(res);
  };

  const handleLogin = async () => {
    setLoading(true);
    const res = await loginAPI({
      email: valueLogin.email,
      password: valueLogin.password,
    });
    setLoading(false);
    console.log(res);
    if (res.status === 200) {
      const { access, id, refresh } = res.data;
      toast('🔔 Logged in successfully');
      setUser({
        id,
        email: 'admin@gmail.com',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzJoA4UNRwoNGyX-1RxI3Mob1OMDdqtijIQ&s',
      });
      setToken(access);
      setRefreshToken(refresh);
      navigate('/resources/users');
    } else {
      toast.error(res.data.detail);
    }
  };

  return (
    <div className="max-w-[500px] w-full py-8 px-4 mx-auto mt-[100px] border  rounded-[30px] shadow-lg">
      <h2 className="text-3xl font-bold text-center">Login</h2>
      <div className="flex flex-col mt-8 gap-y-6">
        <div className="flex flex-col gap-y-4">
          <label htmlFor="uname" className="">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            value={valueLogin.email}
            className="px-6 py-3 border rounded-lg outline-none"
            required
            onChange={(e) =>
              setValueLogin((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="px-6 py-3 border rounded-lg outline-none"
            name="psw"
            value={valueLogin.password}
            required
            onChange={(e) =>
              setValueLogin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleLogin}
          sx={{ py: '12px' }}
        >
          Login
        </LoadingButton>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Password"
          className="px-6 py-3 border rounded-lg outline-none"
          name="psw"
          value={tokenInput}
          required
          onChange={(e) => setTokenInput(e.target.value)}
        />
        <button onClick={handleRefresh}>refresh</button>
      </div>
    </div>
  );
};

export default Login;
