import ProtectedWrap from '@/app/_components/auth/ProtectedWrap';
import AdminLayoutWrap from '@/app/_components/layouts/AdminLayoutWrap';
import { MenuProvider } from '@/app/_contexts/menuContext';
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
  return (
    <ProtectedWrap>
      <MenuProvider>
        <AdminLayoutWrap>{children}</AdminLayoutWrap>
      </MenuProvider>
    </ProtectedWrap>
  );
}
