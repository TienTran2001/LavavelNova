// @react
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// @apis
import { addMaterialCategoriesAPI } from '~/apis/materialCategories';

// @components
import { FormActionCategory } from '../components';

// @types
import { IFormCategory } from '../type';

interface IMCategory {
  data: IFormCategory;
  loading: boolean;
}

const initialState = {
  data: {
    image: [],
    name: '',
    price_type: '',
  },
  loading: false,
};

const CreateMaterialCategory = () => {
  const [category, setCategory] = useState<IMCategory>(initialState);
  const [resetForm, setResetForm] = useState<() => void>(() => {});

  const handleOnSubmit = async (
    data: IFormCategory,
    resetOption?: {
      reset: () => void;
      setResetImage: React.Dispatch<React.SetStateAction<boolean>>;
    }
  ) => {
    setCategory((prev) => ({ ...prev, loading: true }));
    if (resetOption) {
      const { reset, setResetImage } = resetOption;
      setResetForm(() => reset); // callback to use reset form
      setResetImage((prev) => !prev); // clear link img
    }
    setCategory((prev) => ({ ...prev, data }));
  };

  const handleAddCategory = useCallback(
    async (data: IFormCategory) => {
      try {
        await addMaterialCategoriesAPI(data);
        setCategory((prev) => ({ ...prev, loading: false }));
        toast('🔔 Created successfully!!');
        resetForm();
      } catch (err) {
        setCategory((prev) => ({ ...prev, loading: false }));
        toast('Created fail!!!');
      }
    },
    [resetForm]
  );

  useEffect(() => {
    if (category.loading) {
      if (category.data) {
        handleAddCategory(category.data);
      }
    }
  }, [category.data, category.loading, handleAddCategory]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material Category
      </h2>
      <div className="mt-[50px]">
        <FormActionCategory
          loading={category.loading}
          type="create"
          handleOnSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
};

export default CreateMaterialCategory;
