import { useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { addMaterialCategoriesAPI } from '../../../../apis/materialCategories';
import FormActionCategory, {
  IFormInput,
} from '../components/FormActionCategory';

const CreateMaterialCategory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFormInput | null>(null);
  const [resetForm, setResetForm] = useState<() => void>(() => {});

  const handleOnSubmit = async (data: IFormInput, reset?: () => void) => {
    setLoading(true);
    if (reset) {
      setResetForm(() => reset);
    }
    setData(data);
  };

  const handleAddCategory = useCallback(
    async (data: IFormInput) => {
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
