'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useSearchQuery = (query: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSearchQuery = searchParams.get(query) || '';
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);

  const handleOnSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(query, searchQuery.trim());
    newSearchParams.set('_page', '1');

    router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    setSearchQuery(currentSearchQuery);
  }, [currentSearchQuery, setSearchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    handleOnSearch,
  };
};

export default useSearchQuery;
