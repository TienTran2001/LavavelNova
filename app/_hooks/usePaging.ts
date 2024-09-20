'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const usePaging = (maxPage: number) => {
  const searchParams = useSearchParams(); // Lấy search params
  const router = useRouter(); // Dùng để cập nhật URL
  const page: number = Number(searchParams.get('_page')) || 1;

  const updatePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('_page', newPage.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

  const prevClick = () => {
    const newPage = Math.max(page - 1, 1);
    updatePage(newPage);
  };

  const nextClick = () => {
    updatePage(page + 1);
  };

  useEffect(() => {
    if (page < 1) {
      updatePage(1);
    }
    if (maxPage > 0 && page > maxPage) {
      updatePage(maxPage);
    }
  }, [maxPage, page]);

  return {
    prevClick,
    nextClick,
    page,
  };
};

export default usePaging;
