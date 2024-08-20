// @react
import { useRef } from 'react';
import { toast } from 'react-toastify';

// @apis
import { addMaterialCategoriesAPI } from '~/apis/materialCategories';

// @components
import { FormActionCategory } from '../components';

// @types
import { IFormCategory } from '../type';

const CreateMaterialCategory = () => {
  // @ref
  const actionFormRef = useRef<{ resetForm: () => void }>(null);

  // @handle
  const handleAddCategory = async (data: IFormCategory) => {
    try {
      await addMaterialCategoriesAPI(data);
      toast('🔔 Created successfully!!');
      actionFormRef.current?.resetForm();
    } catch (err) {
      toast('Created fail!!!');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray/600">
        Create a new Material Category
      </h2>
      <div className="mt-50">
        <FormActionCategory
          ref={actionFormRef}
          handleAction={handleAddCategory}
          type="create"
        />
      </div>
    </div>
  );
};

export default CreateMaterialCategory;
