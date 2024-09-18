import Login from '@/app/_components/pages/login/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login - Laravel Nova',
};

export default function LoginPage() {
  return <Login />;
}
