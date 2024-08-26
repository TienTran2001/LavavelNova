import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchQuery = (query: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchQuery = searchParams.get(query) || '';

  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);
  const handleOnSearch = () => {
    if (searchQuery) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(query, searchQuery.trim());
      newSearchParams.set('_page', '1');
      setSearchParams(newSearchParams);
    }
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
