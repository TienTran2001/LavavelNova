import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePaging = (page: number, onPageChange: (newPage: number) => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageParams = new URLSearchParams(location.search);
  const currentPageQuery = pageParams.get('_page') || '';

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

  useEffect(() => {
    onPageChange(Number(currentPageQuery));
  }, [page]);

  return {
    prevClick,
    nextClick,
  };
};

export default usePaging;
