'use client';

import { useCheckIsHydrated } from '@/app/_hooks';
import { useUserStore } from '@/app/_store/useUserStore';
import { useRouter } from 'next/navigation';

interface IProps {
  children: React.ReactNode;
}

const ProtectedWrap = ({ children }: IProps) => {
  const router = useRouter();

  const { isHydrated } = useCheckIsHydrated();
  const { user } = useUserStore();

  if (isHydrated && !user) {
    router.push('/login');
  }

  return <div>{children}</div>;
};

export default ProtectedWrap;
