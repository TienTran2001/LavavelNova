import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchQuery = searchParams.get('search_query') || '';

  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);
  const handleOnSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search_query', searchQuery.trim());
    newSearchParams.set('_page', '1');
    setSearchParams(newSearchParams);
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
