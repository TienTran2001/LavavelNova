import { useCheckIsHydrated } from '@/app/_hooks';
import { useUserStore } from '@/app/_store/useUserStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const redirectIfLoggedIn = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();
  const { isHydrated } = useCheckIsHydrated();

  useEffect(() => {
    if (isHydrated && user) {
      if (pathname === '/login') router.push('/admin/materials/main');
      else router.back();
    }
  }, [isHydrated, user, router]);
};

export default redirectIfLoggedIn;
