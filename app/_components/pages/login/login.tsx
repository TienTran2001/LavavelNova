'use client';

import { loginAPI } from '@/app/_api/auth';
import InputForm from '@/app/_components/ui/input/InputForm';
import { useUserStore } from '@/app/_store/useUserStore';
import redirectIfLoggedIn from '@/app/_utils/redirectIfLoggedIn';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const [valueLogin, setValueLogin] = useState<ILogin>({
    email: '',
    password: '',
  });

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>();

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { setUser, setToken, setRefreshToken } = useUserStore();

  redirectIfLoggedIn();

  const handleOnSubmit = (data: ILogin) => {
    setValueLogin(data);
    setLoading(true);
  };

  const handleRedirectLogin = () => {
    router.push('/admin/materials');
  };

  const handleLogin = useCallback(async () => {
    try {
      const res = await loginAPI({
        email: valueLogin.email,
        password: valueLogin.password,
      });
      setLoading(false);

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

      handleRedirectLogin();
    } catch (err) {
      setLoading(false);
      const { response } = err as {
        response?: { data: { detail: string } };
      };
      if (response && response.data && response.data.detail)
        toast.error(response.data.detail);
    }
  }, [
    router,
    setRefreshToken,
    setToken,
    setUser,
    valueLogin.email,
    valueLogin.password,
  ]);

  useEffect(() => {
    if (loading) {
      handleLogin();
    }
  }, [loading, handleLogin]);

  useEffect(() => {
    setValue('email', 'admin@gmail.com');
    setValue('password', '123456');
  }, [setValue]);

  return (
    <div className="fixed inset-0 bg-primary/500">
      <div className="max-w-[450px] p-8 w-full absolute right-0 top-0 bottom-0 bg-white">
        <div className="flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="logo"
            className="object-cover w-[50px] h-full"
          />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-center">Login</h2>
        <div className="flex flex-col mt-8 gap-y-6">
          <div className="flex flex-col gap-y-4">
            <InputForm
              label="Email*"
              register={register}
              id="email"
              placeholder="Enter email..."
              validate={{
                required: 'Email is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email!',
                },
              }}
              errors={errors}
            />
            <InputForm
              label="Password*"
              type="password"
              register={register}
              id="password"
              placeholder="Enter password..."
              validate={{
                required: 'Password is required.',
              }}
              errors={errors}
            />
          </div>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit(handleOnSubmit)}
            sx={{
              py: '8px',
              borderRadius: '8px',
              textTransform: 'capitalize',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            Login
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
