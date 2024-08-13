import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePaging = (maxPage: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = Number(searchParams.get('_page')) || 1;

  const prevClick = () => {
    const newPage = Math.max(page - 1, 1);
    searchParams.set('_page', newPage.toString());
    setSearchParams(searchParams);
  };

  const nextClick = () => {
    searchParams.set('_page', (page + 1).toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (page < 1) {
      searchParams.set('_page', '1');
      setSearchParams(searchParams);
    }
    if (maxPage > 0 && page > maxPage) {
      searchParams.set('_page', `${maxPage}`);
      setSearchParams(searchParams);
    }
  }, [maxPage, page, searchParams, setSearchParams]);

  return {
    prevClick,
    nextClick,
    page,
  };
};

export default usePaging;
