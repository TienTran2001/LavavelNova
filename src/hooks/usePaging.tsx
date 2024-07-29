import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePaging = (page: number) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageParams = new URLSearchParams(location.search);
  const currentPageQuery = pageParams.get('_page') || '1';
  console.log('🚀 ~ usePaging ~ currentPageQuery:', currentPageQuery);
  page = page + 1;

  const prevClick = () => {
    pageParams.set('_page', (page - 1).toString());
    navigate({
      pathname: `${location.pathname}`,
      search: `${pageParams}`,
    });
  };

  const nextClick = () => {
    pageParams.set('_page', (page + 1).toString());
    navigate({
      pathname: `${location.pathname}`,
      search: pageParams.toString(),
    });
  };

  useEffect(() => {}, [page]);

  return {
    prevClick,
    nextClick,
    currentPageQuery,
  };
};

export default usePaging;
