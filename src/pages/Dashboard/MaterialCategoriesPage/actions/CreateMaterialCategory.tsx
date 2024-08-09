// @react
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// @apis
import { addMaterialCategoriesAPI } from '~/apis/materialCategories';

// @components
import { FormActionCategory } from '../components';

// @types
import { IFormCategory } from '../type';

const CreateMaterialCategory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFormCategory | null>(null);
  const [resetForm, setResetForm] = useState<() => void>(() => {});

  const handleOnSubmit = async (data: IFormCategory, reset?: () => void) => {
    setLoading(true);
    if (reset) {
      setResetForm(() => reset);
    }
    setData(data);
  };

  const handleAddCategory = useCallback(
    async (data: IFormCategory) => {
      try {
        await addMaterialCategoriesAPI(data);
        setLoading(false);
        toast('🔔 Created successfully!!');
        resetForm();
      } catch (err) {
        setLoading(false);
        toast('Created fail!!!');
      }
    },
    [resetForm]
  );

  useEffect(() => {
    if (loading) {
      if (data) {
        handleAddCategory(data);
      }
    }
  }, [data, handleAddCategory, loading]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material Category
      </h2>
      <div className="mt-[50px]">
        <FormActionCategory
          loading={loading}
          type="create"
          handleOnSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
};

export default CreateMaterialCategory;
