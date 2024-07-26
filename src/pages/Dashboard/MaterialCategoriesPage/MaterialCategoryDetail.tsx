import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MaterialCategoryDetail = () => {
  const { id } = useParams();

  useEffect(() => {});
  return <div>Detail category: {id} </div>;
};

export default MaterialCategoryDetail;
