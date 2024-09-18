import ProtectedWrap from '@/app/_components/auth/ProtectedWrap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Laravel Nova',
  description: 'admin',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedWrap>{children}</ProtectedWrap>;
}
