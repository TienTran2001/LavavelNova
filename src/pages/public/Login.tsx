import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

const Login = () => {
  const [valueLogin, setValueLogin] = useState<{
    username: string;
    password: string;
  }>({
    username: 'Admin',
    password: 'abc',
  });

  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const handleLogin = () => {
    if (valueLogin.username === 'Admin' && valueLogin.password === 'abc') {
      setUser({
        username: 'Admin',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzJoA4UNRwoNGyX-1RxI3Mob1OMDdqtijIQ&s',
      });
      navigate('/resources/users');
    }
    console.log('🚀 ~ Login ~ valueLogin:', valueLogin);
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
            value={valueLogin.username}
            className="px-6 py-3 border rounded-lg outline-none"
            required
            onChange={(e) =>
              setValueLogin((prev) => ({ ...prev, username: e.target.value }))
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
        <Button variant="contained" onClick={handleLogin} className="">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
