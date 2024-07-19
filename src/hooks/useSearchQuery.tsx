import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSearchQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSearchQuery = searchParams.get('search_query') || '';

  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);

  const handleOnSearch = () => {
    searchParams.set('search_query', searchQuery.trim());
    searchParams.set('_page', '0');
    navigate({
      pathname: `${location.pathname}`,
      search: `${searchParams}`,
    });
  };

  useEffect(() => {
    setSearchQuery(currentSearchQuery);
  }, [currentSearchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    handleOnSearch,
  };
};

export default useSearchQuery;
