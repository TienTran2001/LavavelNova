// @react
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// @apis
import {
  getMaterialCategoryAPI,
  updateMaterialCategoryAPI,
} from '~/apis/materialCategories';

// @components
import { FormActionCategory } from '../components';

// @types
import { IFormCategory } from '../type';

const UpdateMaterialCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFormCategory | null>(null);
  const [category, setCategory] = useState<{
    image: string;
    name: string;
    price_type: string;
  } | null>(null);

  const handleOnSubmit = async (data: IFormCategory) => {
    setLoading(true);
    setData(data);
  };

  const handleUpdateCategory = useCallback(
    async (data: IFormCategory) => {
      try {
        if (id) {
          await updateMaterialCategoryAPI(id, data);
          setLoading(false);
          toast('🔔 Updated successfully!!');
        }
      } catch (err) {
        setLoading(false);
        toast('Updated fail!!!');
      }
    },
    [id]
  );

  useEffect(() => {
    if (loading) {
      if (data) {
        handleUpdateCategory(data);
      }
    }
  }, [data, handleUpdateCategory, id, loading]);

  const getDetailCategory = useCallback(async (id: string) => {
    const response = await getMaterialCategoryAPI(id);
    const { data } = response;
    setCategory(data);
  }, []);

  useEffect(() => {
    if (id) getDetailCategory(id);
  }, [id, getDetailCategory]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Update a new Material Category
      </h2>
      <div className="mt-[50px]">
        <FormActionCategory
          category={category}
          loading={loading}
          type="update"
          handleOnSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
};

export default UpdateMaterialCategory;
